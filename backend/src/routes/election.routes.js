import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {userProfile} from '../models/user.model.js';
import Candidate from '../models/candidate.model.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import dotenv from 'dotenv';
dotenv.config({path:".env"});

const router = express.Router(); // here i create router instance

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Registration Error:", err); // Log the error for debugging
        res.status(500).json({ error: 'Registration failed', details: err.message }); // 500 for server errors
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' }); // Consistent message
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' }); // Consistent message
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });

    } catch (err) {
        console.error("Login Error:", err);  // Log the error
        res.status(500).json({ error: 'Login failed', details: err.message }); // 500 for server errors
    }
});

// Authentication middleware
// function authenticate(req, res, next) {
//     const token = req.header('Authorization')?.split(' ')[1]; // Get token from header

//     if (!token) {
//         return res.status(401).json({ error: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Add user info to request object
//         next(); // Proceed to the next middleware/route handler
//     } catch (err) {
//         res.status(401).json({ error: 'Token is not valid' });
//     }
// }

// Example of a protected route (requires authentication)
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        res.json(user);
    } catch (err) {
        console.error("Profile Error:", err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Register a Candidate
router.post('/candidates', authenticate, async (req, res) => { // Protect with authentication
    try {
        const { name, position, manifesto, image } = req.body; // Include image

        const newCandidate = new Candidate({
            name,
            position,
            manifesto,
            image // Save the image URL or path
        });

        await newCandidate.save();
        res.status(201).json({ message: 'Candidate registered successfully' });
    } catch (error) {
        console.error("Candidate Registration Error:", error);
        res.status(500).json({ message: 'Server error during candidate registration' });
    }
});

// Get All Candidates
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error("Get Candidates Error:", error);
        res.status(500).json({ message: 'Server error getting candidates' });
    }
});

// Cast Vote (POST /election/vote) - Requires Authentication Middleware
router.post('/vote', authenticate, async (req, res) => {
    try {
        const { candidateId } = req.body; // Get candidate ID

        const user = await User.findById(req.user.id);  //Get user from auth
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        if (user.voted) {
            return res.status(400).json({ message: "User has already voted." });
        }


        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.votes++;
        await candidate.save();

        user.voted = true;
        await user.save();

        res.json({ message: 'Vote cast successfully' });
    } catch (error) {
        console.error("Voting Error:", error);
        res.status(500).json({ message: 'Server error during voting' });
    }
});

// Get Live Results
router.get('/results', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error("Results Error:", error);
        res.status(500).json({ message: 'Server error getting results' });
    }
});

export default router; 
