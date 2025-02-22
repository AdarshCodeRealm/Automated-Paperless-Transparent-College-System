// 5. Academic Integrity & Cheating Record System
// ● If a stude nt is caught cheating in an exam, their details (name, reason, and proof) are publicly visible to all students.

// Create a new violation record
import { uploadOnCloudinary } from "../utils/utils/cloudinary.js"
import Violation from "../models/cheatingRecord.model.js"
const createViolation = async (req, res) => {
  const {
    registrationNumber,
    fullName,
    year,
    branch,
    email,
    subjectCode,
    subjectName,
    invigilatorName,
    invigilatorID,
    reason,
  } = req.body
  try {
    if (
      !registrationNumber ||
      !fullName ||
      !year ||
      !branch ||
      !email ||
      !subjectCode ||
      !subjectName ||
      !invigilatorName ||
      !invigilatorID ||
      !reason
    ) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const attachments = req.files?.evidence
    const evidences = []
    if (attachments) {
      for (const file of attachments) {
        const result = await uploadOnCloudinary(file.path)
        evidences.push(result.url)
      }
    }

    const evidence = req.files
    const violation = new Violation(
      {
        registrationNumber,
        fullName,
        year,
        branch,
        email,
        subjectCode,
        subjectName,
        invigilatorName,
        invigilatorID,
        reason,

        evidence: evidences,
      }
    )
    await violation.save()
    res.status(201).json({message: "Violation created", violation})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all violation records

const getAllViolations = async (req, res) => {
  try {
    const violations = await Violation.find()
    res.json(violations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a violation record by ID

const deleteViolation = async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(req.params.id)
    if (!violation) {
      return res.status(404).json({ message: "Violation not found" })
    }
    res.json({ message: "Violation deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export { createViolation, getAllViolations, deleteViolation }
