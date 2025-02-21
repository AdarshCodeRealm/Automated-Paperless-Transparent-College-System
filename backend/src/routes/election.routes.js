import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
router.get("/profile", authenticate, getProfile)

// Register a Candidate
router.post("/registercandidate", authenticate, registerCandidate)

// Get All Candidates
router.get("/candidates", getAllCandidates)

// Cast Vote (POST /election/vote) - Requires Authentication Middleware
router.post("/vote", authenticate, castVote)

// Get Live Results
router.get("/results", getLiveResults)

export default router
