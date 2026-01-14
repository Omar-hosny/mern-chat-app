import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/generateToken.js";
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
      createdAt: savedUser.createdAt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// signin controller

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // trim email, password if they are strings
    const newEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const newPassword = typeof password === "string" ? password.trim() : "";
    if (!newEmail || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if user exists
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // generate token
    generateToken(user._id, res);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      status: user.status,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout controller
export const logout = (_, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update profile controller
export const updateProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({ message: "Avatar is required" });
    }
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(avatar, {
      folder: "chat_app",
    });

    const updatedUser = await User.findByIdAndUpdate(userId, {
      avatar: uploadResponse.secure_url,
    }).select("-password -__v");

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error - updateProfile" });
  }
};
