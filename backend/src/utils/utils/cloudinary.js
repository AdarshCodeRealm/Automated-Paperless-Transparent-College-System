import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath);
    fs.unlinkSync(localFilePath)
    return result; // Return the Cloudinary result
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(localFilePath)
    throw error; // Re-throw the error to be handled by the caller
  }
}

export { uploadOnCloudinary }