// 1. Student Election System
    // ● Online election platform for student councils with candidate profi les.
    // ● Secure voting mechanism with college email authentication.
    // ● Live result tracking for transparency.

    // election.controller.js
import {userProfile,registerUser} from '../models/user.model.js';
import Candidate from '../models/candidate.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Controllers
const userRegister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await userRegister.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await registerUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await userProfile.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error("Profile Error:", err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};


// Candidate Controllers
const registerCandidate = async (req, res) => {
    try {
        const { name, position} = req.body;

        const newCandidate = new Candidate({
            name,
            position,
            votes
        });

        await newCandidate.save();
        res.status(201).json({ message: 'Candidate registered successfully' });
    } catch (error) {
        console.error("Candidate Registration Error:", error);
        res.status(500).json({ message: 'Server error during candidate registration' });
    }
};

const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error("Get Candidates Error:", error);
        res.status(500).json({ message: 'Server error getting candidates' });
    }
};

const castVote = async (req, res) => {
    try {
        const { candidateId } = req.body;

        const user = await Candidate.findById(req.user.id);
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
};

const getLiveResults = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error("Results Error:", error);
        res.status(500).json({ message: 'Server error getting results' });
    }
};



export {
    userRegister,
    loginUser,
    getProfile,
    registerCandidate,
    getAllCandidates,
    castVote,
    getLiveResults,
    // authenticate // Export the middleware
};