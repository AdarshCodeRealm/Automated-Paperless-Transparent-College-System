import { Router } from "express"
import testModel from "../models/test.model.js"

const router = Router()

// router.get("/gete", async (req, res) => {
//   try {
//     const newData = await testModel.create({ data: "Some data", value: 460 })
//     console.log("Data saved successfully!", newData)
//     res.status(200).json(newData) 

//     //After 60 seconds, this document will be automatically deleted by MongoDB due to the TTL index.
//   } catch (error) {
//     console.error("Error saving data:", error)
//     res.status(500).json({ error: "Failed to save data" })
//   }
// })
router.get('/set-cookie', (req, res) => {
  res.cookie('myHttpOnlyCookie', 'cookieValue', {
    httpOnly: true,
    secure: true, // Requires HTTPS 
    maxAge: 30000, // 30 seconds in milliseconds
  });
  res.send('HTTP-only and secure cookie set!');
});

router.get('/clear-cookie', (req, res) => {
  console.log("cook", cook)
  res.clearCookie('myHttpOnlyCookie');
  res.send('HTTP-only cookie cleared!');
});

export default router
