import { userProfile as User } from "./user.model.js"
import { Schema, model } from "mongoose"

const complaintSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Facility", "Academic", "Student Life", "Other"],
    trim: true,
  },
  attachments: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },
  upvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],voteCount: {
    type: Number,
    default: 0
  },
  downvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ], 
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  raisedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
})

complaintSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

// -----------------------------------------  complaint model ----------------------
const Complaint = model("Complaint", complaintSchema)

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  complaintId: {
    type: Schema.Types.ObjectId,
    ref: "Complaint",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
})

commentSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

const Comment = model("Comment", commentSchema)

// ---------------------------  export models -------------------------------
export { Complaint, Comment }
