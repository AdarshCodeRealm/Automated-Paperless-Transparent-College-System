import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
  userRegister,
  loginUser,
  getProfile,
  registerCandidate,
  getAllCandidates,
  castVote,
  getLiveResults,
} from "../controllers/election.controller.js"
// import {userProfile} from '../models/user.model.js';
// import Candidate from '../models/candidate.model.js';
import authenticate from "../middlewares/authenticate.middleware.js"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const router = express.Router() // here i create router instance

// Register User
router.post("/register", userRegister)

// Login User
router.post("/login", loginUser)

// Example of a protected route (requires authentication)
router.get("/profile", verifyJWT, getProfile)

// Register a Candidate
router.post("/candidateregister",registerCandidate) //ye bhi

// Get All Candidates
router.get("/candidates", getAllCandidates) //kam kara hai

// Cast Vote (POST /election/vote) - Requires Authentication Middleware
router.post("/vote", verifyJWT, castVote)

// Get Live Results
router.get("/results", getLiveResults)

export default router
