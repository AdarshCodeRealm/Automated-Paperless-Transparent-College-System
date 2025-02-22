// 6. Anonymous Complaint System
// ● Students can submit anonymous complaints, which are visible to all.
// ● Complaints undergo moderation; vulgar content is blocked (no inappropriate images/videos).
// ● Identity of anonymous complainants is revealed only if a majority of board members approve.
import mongoose from "mongoose"
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"
import { upload } from "../middlewares/multer.middleware.js"
import { Complaint, Comment } from "../models/complaint.model.js"
import { userProfile } from "../models/user.model.js"
const createComplaint = async (req, res) => {
  const { title, description, category, status,id} = req.body
  console.log(id)
  // const { attachments } = req.files
  const userData = await userProfile.findById(new mongoose.Types.ObjectId(id))
  console.log(userData)
  if (!userData) {
    return res.status(404).json({ message: "User not found" })
  }

  // const images = []
  // const videos = []

  // for (const attachment of attachments) {
  //   if (attachment.mimetype.startsWith("image/")) {
  //     images.push(attachment.path)
  //   } else if (attachment.mimetype.startsWith("video/")) { 
  //     videos.push(attachment.path)
  //   }
  // }
  // const cloudinaryImagesUrl = []
  // const cloudinaryVideosUrl = []
  // for (const image of images) {
  //   const cloudinaryImage = await uploadOnCloudinary(image)
  //   cloudinaryImagesUrl.push(cloudinaryImage?.url)
  // }
  // for (const video of videos) {
  //   const cloudinaryVideo = await uploadOnCloudinary(video)
  //   cloudinaryVideosUrl.push(cloudinaryVideo?.url)
  // }

  // const cloudinaryAttachments = [...cloudinaryImagesUrl, ...cloudinaryVideosUrl]

  const newComplaint = {
    title,
    description,
    category,
    status,
    // attachments: cloudinaryAttachments,
    raisedBy:userData._id
  }

  const createdComplaint = await Complaint.create(newComplaint)
  await createdComplaint.save()

  res.status(200).json({
    status: "success",
    message: "complaint raised",
    complaint: createdComplaint,
  })
}
const toggleUpvote = async (req, res) => {
  try {
   
    const { complaintId, userId } = req.params;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const userIndex = complaint.upvote.indexOf(userId); // Check if userId exists

    if (userIndex > -1) {
      // User ID is found, remove it (un-upvote)
      complaint.upvote.splice(userIndex, 1);
      complaint.voteCount = complaint.voteCount - 1; // Decrement voteCount
      await complaint.save();
      res.json({ message: "undo Upvote successfully", complaint });
    } else {
      // User ID is not found, add it (upvote)
      complaint.upvote.push(userId);
      complaint.voteCount = complaint.voteCount + 1; // Increment voteCount

      // Remove downvote if user has downvoted previously
      const downvoteIndex = complaint.downvote.indexOf(userId);
      if (downvoteIndex > -1) {
        complaint.downvote.splice(downvoteIndex, 1);
      }

      await complaint.save();
      res.json({ message: "Upvote successfully", complaint });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleDownvote = async (req, res) => {
  try {
    const { complaintId } = req.params
    const userId = req.user._id

    const complaint = await Complaint.findById(complaintId)
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    const userIndex = complaint.downvote.indexOf(userId)

    if (userIndex > -1) {
      complaint.downvote.splice(userIndex, 1)
      await complaint.save()
      return res.json({ message: "Downvote removed successfully", complaint }) // Specific message
    }

    complaint.downvote.push(userId)

    const upvoteIndex = complaint.upvote.indexOf(userId)
    if (upvoteIndex > -1) {
      complaint.upvote.splice(upvoteIndex, 1)
    }

    await complaint.save()
    return res.json({ message: "Downvote added successfully", complaint }) // Specific message
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })

    res.json({ status: "success", complaints })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const deleteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id
    const userId = req.user._id // User ID from JWT

    const complaint = await Complaint.findById(complaintId)

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    // Check if the user is the creator of the complaint
    if (complaint.raisedBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this complaint" }) // 403 Forbidden
    }

    // Delete the complaint
    await Complaint.findByIdAndDelete(complaintId) // Or complaint.remove()

    return res.status(200).json({ message: "Complaint deleted successfully" })
  } catch (error) {
    console.error("Error deleting complaint:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
const createComment = async (req, res) => {
  try {
    const complaintId = req.params.id
    const { comment } = req.body
    const userId = req.user._id

    const newComment = new Comment({
      user: userId, // Set the user who created the comment
      comment,
      complaintId,
    })

    const savedComment = await newComment.save() // Save the comment
    await Complaint.findByIdAndUpdate(complaintId, {
      $push: { comments: savedComment._id }, // Push the new comment's ID
    })
    res.status(201).json({ message: "Comment created", comment: savedComment })
  } catch (error) {
    console.error("Error creating comment:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id
    const userId = req.user._id

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }
    await Comment.findByIdAndDelete(commentId)

    const objectIdComplaintId = comment.complaintId

    const updateResult = await Complaint.findByIdAndUpdate(
      objectIdComplaintId,
      {
        $pull: { comments: commentId },
      }
    )

    if (!updateResult) {
      console.error("Complaint not found for comment:", commentId)
      return res
        .status(404)
        .json({ message: "Complaint not found for this comment" })
    }

    if (updateResult.modifiedCount === 0) {
      console.warn(
        "Comment ID not found in Complaint's comments array:",
        commentId
      )
    }

    res.status(200).json({ message: "Comment deleted" })
  } catch (error) {
    console.error("Error deleting comment:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export {
  createComplaint,
  toggleUpvote,
  toggleDownvote,
  getAllComplaints,
  deleteComplaint,
  deleteComment,
  createComment,
}
