import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...",)
    const connectionPromise = await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log("MongoDB connected successfully.")
    console.log("run on host :", connectionPromise.connection.host)
    console.log("run on port :", connectionPromise.connection.port)
    console.log("Database Name :", connectionPromise.connection.name)
  } catch (error) {
    console.log("MongoDB connection failed :", error)
  }
}
export default connectDB
