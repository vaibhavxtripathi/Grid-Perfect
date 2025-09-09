import "server-only";
import { v2 as cloudinary } from "cloudinary";

// Configure at runtime; Cloudinary SDK will read CLOUDINARY_URL automatically.
// This avoids referencing individual secret values in source.
cloudinary.config({ secure: true });

export default cloudinary;
