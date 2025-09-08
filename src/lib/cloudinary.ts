import "server-only";
import { v2 as cloudinary } from "cloudinary";

// Configure using environment variables. Avoid direct dot-notation so bundlers
// don't inline secrets at build time.
const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
const apiKey = process.env["CLOUDINARY_API_KEY"];
const apiSecret = process.env["CLOUDINARY_API_SECRET"];

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;
