import {
  userProfile as userModel,
  registerUser as userRegisterModel,
} from "../models/user.model.js"
import {
  sendOtpVerificationMail,
  sendResetPasswordMail,
} from "../utils/utils/NodeMailer.js"
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/utils/ApiError.js"
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await userModel.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    const accessToken = user.generateAccessToken()
    // console.log(accessToken)
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    console.error(error)
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    )
  }
}

const registerUser = async (req, res) => {
  const { name, email, password, mobile, bio } = req.body

  if (typeof email !== "string") {
    return false // Handle cases where email is not a string
  }
  const validClgMail = email.toLowerCase().endsWith("@sggs.ac.in")
  if (!validClgMail) {
    return res.status(400).json({
      status: "Not valid email address, please use college mail id",
      message: `Invalid email : ${email}`,
    })
  }
  const emailLower = email.toLowerCase()
  const department = emailLower.includes("bcs")
    ? "Computer Science"
    : emailLower.includes("bec")
      ? "Electronics and Communication"
      : emailLower.includes("bme")
        ? "Mechanical Engineering"
        : emailLower.includes("bce")
          ? "Civil Engineering"
          : emailLower.includes("bec")
            ? "Electrical and Electronics Engineering"
            : emailLower.includes("bit")
              ? "Information Technology"
              : null // Default: unknown department

  let role
  if (department == null) {
    role = "Professor"
  } else {
    role = "Student"
  }

  const checkUserIsExist = await userModel.findOne({ email })
  if (checkUserIsExist) {
    return res.status(400).json({
      status: "Failed to create user",
      message: `User already exist with email : ${email}`,
    })
  }
  const checkregister = await userRegisterModel.findOne({ email })
  if (checkregister) {
    return res.status(400).json({
      status: "Failed to register user",
      message: `Registration already exist with email : ${email}, check your email for otp `,
      inProcess: true,
    })
  }

  let avatarLocalPath,
    avatar = null

  if (req.files?.avatar && req.files.avatar.length > 0) {
    avatarLocalPath = req.files.avatar[0].path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
  }

  try {
    // Send verification email
    const OTP = Math.floor(Math.random() * 1000000)
    await sendOtpVerificationMail(email, OTP)
    await sendOtpVerificationMail("2022bec155@sggs.ac.in", OTP)

    const user = await userRegisterModel.create({
      name,
      email,
      password,
      bio,
      mobile,
      avatar: avatar != null ? avatar.url : "",
      role,
      department,
      otp: OTP,
    })

    const createdUser = await userRegisterModel
      .findById(user._id)
      .select("-password ")

    res.status(201).json({
      status: "success",
      data: createdUser,
      message: `verification email sent to ${email}`,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "Failed to create user",
      message: error.message,
    })
  }
}

const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body
  try {
    const user = await userRegisterModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        status: "Failed to verify otp",
        message: "User not found",
      })
    }
    const otpcheck = await user.isOtpCorrect(otp)
    console.log("otpcheck", otpcheck)
    if (!otpcheck) {
      return res.status(400).json({
        status: "Failed to verify otp",
        message: "Invalid OTP",
      })
    } else {
      await userModel.create({
        name: user.name,
        email: user.email,
        password: user.password,
        bio: user.bio,
        mobile: user.mobile,
        avatar: user.avatar,
        role: user.role,
        electionCandidate: user.electionCandidate,
        department: user.department,
      })

      await userRegisterModel.findByIdAndDelete(user._id)

      const createdUser = await userModel
        .findOne({ email: user.email })
        .select(["-password ", "-refreshToken"])

      res.status(200).json({
        status: "OPT verify successfully",
        data: createdUser,
        message: "User created successfully",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "Failed to verify otp",
      message: error.message,
    })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!password && !email) {
    res.status(400).json({ message: "email or password is required" })
  }
  const user = await userModel
    .findOne({ email })
    .select(["-password ", "-refreshToken"])
  if (!user) {
    return res.status(400).json({
      status: "Failed to login",
      message: "User not found",
    })
  }

  const isMatch = await user.isPasswordCorrect(password)

  if (!isMatch) {
    return res.status(400).json({
      status: "Failed to login",
      message: "Invalid password",
    })
  }
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  )

  const loggedInUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken -otp")

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict", // Recommended for security
    path: "/", // Adjust the path as needed
    maxAge: 3600000, // Cookie expiration (in milliseconds)
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: "User logged in successfully",
    })
}

const logoutUser = async (req, res) => {
  try {
    const userExist = await userModel.findByIdAndUpdate(req.user.id, {
      $unset: { refreshToken: 1 },
      $unset: { accessToken: 1 },
    })
    if (!userExist) {
      return res.status(404).json({ message: "User not found" })
    }
    const options = {
      httpOnly: true,
      secure: false,
    }
    res.clearCookie("accessToken", "", options);
    res.clearCookie("refreshToken", "", options);

    return res.status(200).json({ message: "User logged Out Successfully" });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error", error: err })
  }
}

const getCurrentUser = async (req, res) => {
  const accessToken = req.cookies.accessToken
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const user = await userModel.findById(decoded._id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const forgetPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const OTP = Math.floor(Math.random() * 1000000)
    await sendOtpVerificationMail(email, OTP)

    user.otp = OTP
    await user.save({ validateBeforeSave: false })

    return res.status(200).json({ message: "OTP sent successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const otpcheck = user.isOtpCorrect(otp)
    if (!otpcheck) {
      return res.status(400).json({ message: "Invalid OTP" })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.otp = null
    await user.save({ validateBeforeSave: false })
    return res.status(200).json({ message: "Password reset successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password -refreshToken -otp")
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export {
  getUsers,
  registerUser,
  VerifyOtp,
  loginUser,
  logoutUser,
  getCurrentUser,
  resetPassword,
  forgetPassword,
}
