import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "devtales",
        allowed_format: ["jpg","jpeg","png","webp"],
    } as any
});

const upload = multer({
    storage,
})

export default upload;