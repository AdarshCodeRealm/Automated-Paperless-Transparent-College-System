import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import {
  createComplaint,
  toggleUpvote,
  toggleDownvote,
  getAllComplaints,
  deleteComplaint,
  createComment,
  deleteComment,
} from "../controllers/complaint.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router
  .route("/createComplaint")
  .post( createComplaint)
// router
//   .route("/createComplaint")
//   .post(upload.fields([{ name: "attachments", maxCount: 10 }]), createComplaint)

router.route("/toggleUpvote/:complaintId/:userId").patch( toggleUpvote)
router.route("/toggleDownvote/:complaintId").patch( toggleDownvote)
router.route("/").get(getAllComplaints)
router.delete("/:id", verifyJWT, deleteComplaint)
router.post("/comment/:id", verifyJWT, createComment)
router.delete("/comment/:id", verifyJWT, deleteComment)

export default router
