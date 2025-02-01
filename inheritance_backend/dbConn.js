import dotenv from "dotenv";
import mongoose from "mongoose";

// Initialize dotenv to load environment variables
dotenv.config();
const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URI;
    await mongoose.connect(uri);
    console.log("connected");
  } catch (err) {
    console.error(err, "not connected");
  }
};

export default connectDB;
