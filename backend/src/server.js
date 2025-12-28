import express from "express";

// routes
import authRoutes from "./routes/auth.route.js";
// environment variables
import { ENV } from "../lib/env.js";
// database connection
import { connectToDB } from "../lib/db.js";

const app = express();

const PORT = ENV.PORT || 5000;

app.use(express.json()); // parse incoming request body as JSON
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
