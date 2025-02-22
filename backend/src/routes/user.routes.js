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
import {verifyJWT} from "../middlewares/auth.middleware.js"
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
)

router.post("/verifyOtp", VerifyOtp)
router.post("/login", loginUser)
router.get("/logout",verifyJWT, logoutUser) 
router.get("/getCurrentUser", getCurrentUser)
router.get("/forgetPassword", forgetPassword)
router.patch("/resetPassword", resetPassword)


export default router
