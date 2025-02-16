import { Router } from 'express';
import testModel from '../models/test.model.js';

const router = Router();

router.get("/test",async (req, res) => {
    
    await testModel.create({
        name: "adarsha1"
    })
    res.status(200).json({
        status: "success",
        message: "test route"
    })
})
router.get("/gete",async (req, res) => {
    const data = await testModel.find()
    res.status(200).json({
        status: "success",
        data,
        message: "test route"
    })
})
export default router