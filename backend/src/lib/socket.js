import { Server } from "socket.io";
import express from "express";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Apply auth middleware
io.use(socketAuthMiddleware);

const userSocketMap = new Map(); // { userId => socketId }

// Helper function to get a specific user's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};

io.on("connection", (socket) => {
  // Ensure your middleware sets this, or fallback to query
  const userId = socket.userId || socket.handshake.query.userId;

  if (!userId || userId === "undefined") {
    return socket.disconnect();
  }

  // 1. Add user to the map
  userSocketMap.set(userId, socket.id);
  console.log(`User ${userId} is online`);

  // 2. BROADCAST to everyone (io.emit, not socket.emit)
  // This ensures all users see the new person immediately
  io.emit("get-online-users", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    // 3. Remove user from the map
    userSocketMap.delete(userId);
    console.log(`User ${userId} is offline`);

    // 4. Update everyone else
    io.emit("get-online-users", Array.from(userSocketMap.keys()));
  });
});

export { io, server, app };
