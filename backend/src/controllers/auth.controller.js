import { generateToken } from "../../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
// signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // trim name, email, password if they are strings
    const newName = typeof name === "string" ? name.trim().toLowerCase() : "";
    const newEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const newPassword = typeof password === "string" ? password.trim() : "";
    if (!newName || !newEmail || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: newEmail });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // check password length
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const newUser = new User({
      name: newName,
      email: newEmail,
      password: hashedPassword,
    });
    // check if user is created
    if (!newUser) {
      return res.status(400).json({ message: "User not created" });
    }
    const savedUser = await newUser.save();
    // generate token
    generateToken(savedUser._id, res);

    return res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      avatar: savedUser.avatar,
      status: savedUser.status,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
