import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    try {
        const { email, password, displayName, firstName, lastName } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            email,
            password, // Plain text for simplicity, though bcrypt is better
            displayName,
            firstName,
            lastName,
            library: [],
            gifts: [],
            wishlist: [],
            cart: []
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
            .populate("library")
            .populate("gifts")
            .populate("wishlist")
            .populate("cart");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});

export default router;
