// 6. Anonymous Complaint System
// ● Students can submit anonymous complaints, which are visible to all.
// ● Complaints undergo moderation; vulgar content is blocked (no inappropriate images/videos).
// ● Identity of anonymous complainants is revealed only if a majority of board members approve.
import mongoose from "mongoose"
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"
import { upload } from "../middlewares/multer.middleware.js"
import { Complaint, Comment } from "../models/complaint.model.js"
import { userProfile } from "../models/user.model.js"
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = "AIzaSyAlMnfSJArVX8z9iBeNGayWomUxFR3ce1c";
const genAI = new GoogleGenerativeAI(apiKey);


const schema = {
  description: "Complaint content check result",
  type: SchemaType.OBJECT,
  properties: {
    safe: {
      type: SchemaType.BOOLEAN,
      description: "Indicates whether the content is safe",
    },
    reason: {
      type: SchemaType.STRING,
      description: "Reason for being unsafe (if applicable)",
      nullable: true,
    },
  },
  required: ["safe"],
};
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});
async function isContentVulgar(text) {
  try {
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    const result = await model.generateContent({
      contents: [{ parts: [{ text: text }] }],
      safetySettings: safetySettings,
    });

    const response = result.response;
    if (response.promptFeedback && response.promptFeedback.blockReason) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking content safety:", error);
    return true; // Default to block if error occurs
  }
}

// const createComplaint = async (req, res) => {
//   const { title, description, category, status,id} = req.body
//   console.log(id)
//   // const { attachments } = req.files
//   const userData = await userProfile.findById(new mongoose.Types.ObjectId(id))
//   console.log(userData)
//   if (!userData) {
//     return res.status(404).json({ message: "User not found" })
//   }

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

//   const newComplaint = {
//     title,
//     description,
//     category,
//     status,
//     // attachments: cloudinaryAttachments,
//     raisedBy:userData._id
//   }

//   const createdComplaint = await Complaint.create(newComplaint)
//   await createdComplaint.save()

//   res.status(200).json({
//     status: "success",
//     message: "complaint raised",
//     complaint: createdComplaint,
//   })
// }

const createComplaint = async (req, res) => {
  try {
    const { title, description, category, status, id } = req.body;

    const userData = await userProfile.findById(new mongoose.Types.ObjectId(id));
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (await isContentVulgar(title) || await isContentVulgar(description)) {
      return res.status(400).json({ message: "Title or description contains inappropriate content." });
    }

    const newComplaint = {
      title,
      description,
      category,
      status,
      raisedBy: userData._id,
    };

    const createdComplaint = await Complaint.create(newComplaint);
    await createdComplaint.save();

    res.status(200).json({
      status: "success",
      message: "complaint raised",
      complaint: createdComplaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

const seedComplaintData = async (req, res) => {
  try {
    // Find a default user to associate complaints with
    const defaultUser = await userProfile.findOne();
    
    if (!defaultUser) {
      return res.status(404).json({ 
        status: "error", 
        message: "No user found to associate complaints with" 
      });
    }

    // Sample complaint data
    const complaints = [
      {
        title: "Poor Internet Connectivity in Hostel Block C",
        description: "The internet in Block C has been extremely slow for the past week. Students are unable to attend online classes or submit assignments on time. This is affecting our academic performance.",
        category: "Facility",
        status: "Open",
        raisedBy: defaultUser._id,
        voteCount: 7
      },
      {
        title: "Cafeteria Food Quality Issues",
        description: "The food quality in the main cafeteria has declined significantly over the past month. Several students have reported stomach issues after eating there. We request an urgent inspection and improvement.",
        category: "Student Life",
        status: "In Progress",
        raisedBy: defaultUser._id,
        voteCount: 11
      },
      {
        title: "Library Noise Level During Exam Week",
        description: "Despite being a quiet zone, the library has been extremely noisy during exam week. The staff is not enforcing the rules, and it's impossible to concentrate on studies. Please address this issue.",
        category: "Academic",
        status: "Resolved",
        raisedBy: defaultUser._id,
        voteCount: 15
      },
      {
        title: "Broken Air Conditioning in CS Department",
        description: "The air conditioning in the Computer Science department has been malfunctioning for two weeks now. The labs are uncomfortably hot, making it difficult to concentrate during practical sessions.",
        category: "Facility",
        status: "In Progress",
        raisedBy: defaultUser._id,
        voteCount: 9
      },
      {
        title: "Parking Space Shortage for Students",
        description: "There is a severe shortage of parking spaces for students who commute. Many are forced to park far away or in unauthorized areas, resulting in fines. We need more designated student parking areas.",
        category: "Infrastructure",
        status: "Open",
        raisedBy: defaultUser._id,
        voteCount: 23
      },
      {
        title: "Outdated Laboratory Equipment in Physics Lab",
        description: "The equipment in the Physics laboratory is outdated and often malfunctions during experiments. This is affecting our practical learning and grades. Please consider upgrading the equipment.",
        category: "Academic",
        status: "Open",
        raisedBy: defaultUser._id,
        voteCount: 8
      },
      {
        title: "Safety Concerns in Chemistry Labs",
        description: "There are inadequate safety measures in the Chemistry labs. Several safety equipment pieces are missing or not functional. This poses a serious risk to students during experiments.",
        category: "Facility",
        status: "Open",
        raisedBy: defaultUser._id,
        voteCount: 18
      },
      {
        title: "Limited Study Spaces During Exam Period",
        description: "During exam periods, there are not enough quiet study spaces available on campus. The library and study halls are always full, forcing students to study in noisy environments like cafeterias.",
        category: "Academic",
        status: "In Progress",
        raisedBy: defaultUser._id,
        voteCount: 14
      },
      {
        title: "Poor Lighting in Campus Walkways",
        description: "The lighting along campus walkways is insufficient, especially near the dormitories. This creates safety concerns for students walking back to their rooms after evening classes.",
        category: "Infrastructure",
        status: "Open",
        raisedBy: defaultUser._id,
        voteCount: 12
      },
      {
        title: "Inconsistent Water Supply in Hostels",
        description: "The water supply in the hostels is inconsistent, with frequent disruptions. Students are often left without water for basic needs like showering and washing. This is affecting our daily routine.",
        category: "Facility",
        status: "Resolved",
        raisedBy: defaultUser._id,
        voteCount: 16
      }
    ];

    // Clear existing complaints if requested
    if (req.body.clearExisting) {
      await Complaint.deleteMany({});
    }

    // Insert the sample complaints
    const result = await Complaint.insertMany(complaints);
    
    // Update each complaint to have proper upvote arrays based on voteCount
    for (const complaint of result) {
      // Create an array of user IDs for upvotes based on voteCount
      const upvotes = Array(complaint.voteCount).fill(defaultUser._id);
      
      // Update the complaint with the upvote array
      await Complaint.findByIdAndUpdate(complaint._id, {
        upvote: upvotes
      });
    }

    res.status(200).json({
      status: "success",
      message: `${result.length} sample complaints have been added successfully`,
      data: result
    });
  } catch (error) {
    console.error("Error seeding complaint data:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to seed complaint data",
      error: error.message
    });
  }
};

export {
  createComplaint,
  toggleUpvote,
  toggleDownvote,
  getAllComplaints,
  deleteComplaint,
  deleteComment,
  createComment,
  seedComplaintData
}
