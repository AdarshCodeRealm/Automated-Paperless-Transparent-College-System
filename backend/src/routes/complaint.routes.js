import { Router } from "express"
import { raiseComplaint } from "../controllers/complaint.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"
const router = Router()

router.route("/raiseComplaint").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  raiseComplaint
)

router
  .route("/cloudTest")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
    const imageLocalPath = req.files?.image[0]?.path
    console.log(imageLocalPath)
    try {
      const Img = await uploadOnCloudinary(imageLocalPath)
      console.log("Img",Img)
      res.status(200).json({
        status: "success",
        Url: Img?.url,
        message: "test route",
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({
        status: "fail",
        message: error,
      })
    }
 
  })

export default router
