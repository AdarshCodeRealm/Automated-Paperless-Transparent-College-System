import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bio: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Student", "Professor", "Admin"],
      default: "Student",
    },
    electionCandidate: {
      type: Boolean,
      default: false,
    },
    department: {
      type: String,
      default: "B-Tech",
    },

    refreshToken: {
      type: String,
    },
    otp: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)




const userRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bio: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Student", "Professor", "Admin"],
      default: "Student",
    },
    electionCandidate: {
      type: Boolean,
      default: false,
    },
    department: {
      type: String,
      default: "B-Tech",
    },
    voted:{
      type:Boolean,
      default:false


    },

    refreshToken: {
      type: String,
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
    },
    expireAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

userRegisterSchema.index({ expireAt: 1 }, { expireAfterSeconds: 900 })


userProfileSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}
userProfileSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      avatar: this.avatar,
      name: this.name,
      role: this.role,
      mobile: this.mobile,
      bio: this.bio,
      electionCandidate: this.electionCandidate,
      department: this.department,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

userRegisterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
userRegisterSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next()
  this.otp = await bcrypt.hash(this.otp, 10)
  next()
})

userRegisterSchema.methods.isOtpCorrect = async function (inputOtp) {
  return await bcrypt.compare(inputOtp, this.otp)
}
// -------------------------------user profile schema---------------------------------

// ---------------------------------otp bcrpt-----------------------------
userProfileSchema.pre("save", async function (next) {
  if (!this.isModified("otp") || this.otp === null || this.otp.trim() === '') return next()
  this.otp = await bcrypt.hash(this.otp, 10)
  next()
})

// ---------------------------------password bcrpt-----------------------------
// userProfileSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
    
//       this.password = await bcrypt.hash(this.password, 10);
//     } catch (error) {
//       console.error("Error hashing password:", error);
//       next(error);
//     }
//   } else {
//     next();
//   }
// });


// ---------------------------------otp check-----------------------------
userProfileSchema.methods.isOtpCorrect = async function (inputOtp) {
  return await bcrypt.compare(inputOtp, this.otp) 
}

// ---------------------------------password check-----------------------------
userProfileSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const registerUser = mongoose.model("userRegister", userRegisterSchema)
const userProfile = mongoose.model("userProfile", userProfileSchema)
export { registerUser, userProfile }
