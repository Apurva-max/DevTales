import { Router } from "express";

import { authenticate } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadController } from "../controllers/upload.js";

const router = Router();

router.post("/", authenticate, upload.single("image"), uploadController);

export default router;