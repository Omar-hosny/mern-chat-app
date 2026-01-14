import cookieParser from "cookie-parser";
// routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";
// environment variables
import { ENV } from "../src/lib/env.js";
// database connection
import { connectToDB } from "../src/lib/db.js";
import cors from "cors";
import express from "express";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 5000;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // vite dev server
    credentials: true,
  })
);

app.use(express.json()); // parse incoming request body as JSON
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
