import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const { JWT_SECRET } = ENV;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal Server Error - JWT Secret not found" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decodedToken.userId).select(
      "-password -__v"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in authMiddleware", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error - middleware" });
  }
};
