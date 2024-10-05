import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "You must fill all fields" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must contain at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassowrd,
        });

        await user.save();

        generateTokenAndSetCookie(user, res);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error in register: ", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        generateTokenAndSetCookie(user, res);

        res.json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("cinema");
    res.json({ message: "Logged out successfully" });
};
