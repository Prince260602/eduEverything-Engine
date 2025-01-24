import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(
      process.env.MONGO_URI || "mongodb+srv://prince123:prince123@traning.f0mnga6.mongodb.net/ten-all-engin01"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
