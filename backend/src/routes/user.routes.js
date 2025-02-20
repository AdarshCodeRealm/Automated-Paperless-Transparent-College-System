import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  forgetPassword,
  resetPassword,
} from "../controllers/user.controller.js"
import { VerifyOtp } from "../controllers/user.controller.js"
const router = Router()

router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
)
<<<<<<< HEAD
router.post("/sendMail", sendMail)
=======

>>>>>>> 017310c3d1832183b620a8722f2b60f014861026
router.post("/verifyOtp", VerifyOtp)
router.get("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/getCurrentUser", getCurrentUser)
router.get("/forgetPassword", forgetPassword)
router.post("/resetPassword", resetPassword)


export default router
