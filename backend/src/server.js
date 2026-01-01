import express from "express";
import cookieParser from "cookie-parser";
// routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";
// environment variables
import { ENV } from "../src/lib/env.js";
// database connection
import { connectToDB } from "../src/lib/db.js";
// arcjet

const app = express();

const PORT = ENV.PORT || 5000;
app.use(cookieParser());

app.use(express.json()); // parse incoming request body as JSON
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
