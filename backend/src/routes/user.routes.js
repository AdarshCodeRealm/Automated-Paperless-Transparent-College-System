import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import {
  loginUser,
  registerUser,
  logoutUser,
  forgetPassword,
  resetPassword,getCurrentUser,
  getUsers
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
router.route("/").get(getUsers) 

export default router
