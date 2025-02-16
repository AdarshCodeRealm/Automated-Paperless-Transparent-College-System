import { Router } from 'express';
import testModel from '../models/test.model.js';
const router = Router();

// router.get("/test", functionName imported from controller file);
router.get("/test",async (req, res) => {
    
    res.status(200).json({
        status: "success",
        message: "budgetAndSponsorshipTracking route"
    })
})

export default router