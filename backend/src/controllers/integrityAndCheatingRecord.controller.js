// 5. Academic Integrity & Cheating Record System
// ● If a stude nt is caught cheating in an exam, their details (name, reason, and proof) are publicly visible to all students.

// Create a new violation record

import Violation from "../models/cheatingRecord.model.js"
const createViolation = async (req, res) => {
  try {
    const violation = new Violation(req.body)
    await violation.save()
    res.status(201).json(violation)
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
export {
  createViolation,
  getAllViolations,
  deleteViolation,}