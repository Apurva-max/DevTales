import { Router } from "express";

import { addController, removeController, getController } from "../controllers/bookmark.js";
import { authenticate } from "../middleware/auth.js";


const router = Router();

router.get("/", authenticate, getController);
router.post("/:blogId", authenticate, addController);
router.delete("/:blogId", authenticate, removeController);

export default router;