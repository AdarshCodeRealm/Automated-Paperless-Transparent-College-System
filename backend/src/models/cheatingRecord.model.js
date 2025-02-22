import mongoose from "mongoose"
const violationSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    invigilatorName: { type: String, required: true },
    invigilatorID: { type: String, required: true },
    reason: { type: String, required: true },
    evidence: [{ type: String }], // Store file path or URL
  },
  { timestamps: true }
)

const Violation = mongoose.model("Violation", violationSchema)
export default Violation
