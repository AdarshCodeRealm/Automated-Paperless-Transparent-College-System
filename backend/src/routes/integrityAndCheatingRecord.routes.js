import { Router } from "express"

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

router.post("/", createViolation)
router.get("/", getAllViolations)
router.delete("/:id", deleteViolation)

export default router
