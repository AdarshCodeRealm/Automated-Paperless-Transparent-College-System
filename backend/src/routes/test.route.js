import { Router } from "express"
import testModel from "../models/test.model.js"
import { raiseComplaint } from "../controllers/complaint.controller.js"

const router = Router()

router.get("/gete", async (req, res) => {
  try {
    const newData = await testModel.create({ data: "Some data", value: 42 })
    console.log("Data saved successfully!", newData)
    res.status(200).json(newData)

    //After 60 seconds, this document will be automatically deleted by MongoDB due to the TTL index.
  } catch (error) {
    console.error("Error saving data:", error)
    res.status(500).json({ error: "Failed to save data" })
  }
})
export default router
