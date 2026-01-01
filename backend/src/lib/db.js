import mongoose from "mongoose";

// database connection
export async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongoose connection error", error);
    process.exit(1);
  }
}
