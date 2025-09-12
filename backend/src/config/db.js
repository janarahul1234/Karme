import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url);
    
    console.log(`\nMongoDB Connected! DB host: ${connect.connection.host}\n`);
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
