import mongoose, { Schema } from "mongoose"

const sponsorshipSchema = new Schema(
  {
    sponsorName: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    purpose: { type: String, required: true, trim: true },
    agreementDocument: String,
    dateReceived: { type: Date, required: true, default: Date.now },
    approvedBy: { type: Schema.Types.ObjectId, ref: "userProfile" }, // Use userProfile here
  },
  { timestamps: true }
)

const budgetSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Academic", "Event", "Mess", "Project", "Other"],
      trim: true,
    },
    description: { type: String, required: false },
    allocatedAmount: { type: Number, required: true, min: 0 },
    department: {
      type: String,
      enum: [
        "COMPUTER SCIENCE",
        "ELECTRONICS",
        "PRODUCTION",
        "INSTRUMENTAION",
        "MECHANICAL",
        "PRODUCTION",
        "OTHER",
      ],
    },
    event: {
      type: String,
      enum: ["UTSAV", "PRAGYA", "RMEGLADON", "OTHER"],
    }, // Optional
    mess: String, // Optional
    general: String, // Optional
  },
  { timestamps: true }
)

const expenseSchema = new Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now, index: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Stationery",
        "Food",
        "Travel",
        "Accommodation",
        "Marketing",
        "Other",
      ],
      trim: true,
      index: true,
    },
    proofImage: { type: String, required: false }, // Store URL or reference
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "userProfile",
      required: true,
    }, // Use userProfile here
  },
  { timestamps: true }
)

const Sponsorship = mongoose.model("Sponsorship", sponsorshipSchema)
const Budget = mongoose.model("Budget", budgetSchema)
const Expense = mongoose.model("Expense", expenseSchema)

export { Sponsorship, Budget, Expense }
