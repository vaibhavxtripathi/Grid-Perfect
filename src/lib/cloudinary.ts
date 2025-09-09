import "server-only";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

// Validate required config
if (!config.cloud_name || !config.api_key || !config.api_secret) {
  throw new Error(
    "Missing Cloudinary configuration. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables."
  );
}

cloudinary.config(config);

export default cloudinary;
