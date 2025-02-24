import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import {
  loginUser,
  registerUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getCurrentUser,
  getUsers,
} from "../controllers/user.controller.js"
import { VerifyOtp } from "../controllers/user.controller.js"
const router = Router()
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { userProfile } from "../models/user.model.js"
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
)

router.post("/verifyOtp", VerifyOtp)
router.post("/login", loginUser)
router.post("/logout", verifyJWT, logoutUser)
router.get("/getCurrentUser", getCurrentUser)
router.get("/forgetPassword", forgetPassword) 
router.patch("/resetPassword", resetPassword)
router.route("/").get(getUsers)
router.route("/isProtected").get(verifyJWT, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      })
    }

    const user = await userProfile.findById(req.user.id).select("-password")
    res.status(200).json({
      status: "success",
      message: "Protected route",
      isAuthenticated: true,
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    })
  }
})

export default router
