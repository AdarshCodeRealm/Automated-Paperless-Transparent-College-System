import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js" 
import {
  createViolation,
  getAllViolations,
  deleteViolation,
} from "../controllers/integrityAndCheatingRecord.controller.js"
const router = Router()

// router.get("/test", functionName imported from controller file);
router.get("/test", async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "integrityAndCheatingRecord route",
  })
})

router.post("/",upload.fields([{ name: "evidence", maxCount: 5 }]), createViolation)
router.get("/", getAllViolations)
router.delete("/:id", deleteViolation)

export default router
