import { ApiError } from "../utils/utils/ApiError.js";
import { asyncHandler } from "../utils/utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { userProfile as User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            res.status(401).json({ status: "User not logged in", message: "Unauthorized Access" })
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            res.status(401).json({ status: "User not logged in", message: "Invalid accessToken" })
        }
    
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ status: "User not logged in", message: "Invalid accessToken" })
    }
    
})