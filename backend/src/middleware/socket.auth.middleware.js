import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";
export const socketAuthMiddleware = async (socket, next) => {
  try {
    const rawCookies = socket.handshake.headers.cookie;
    if (!rawCookies) return next(new Error("No cookies found"));

    //for better practice cookie parsing logic
    const token = rawCookies
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) return next(new Error("Unauthorized - No Token"));

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // Efficiency: If we only need the ID for the map,
    // we could skip the DB call and just use decoded.userId.
    // But keeping the DB call is safer for checking if user was deleted/banned.
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return next(new Error("User not found"));

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
};
