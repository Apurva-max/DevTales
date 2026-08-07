import { Router } from "express";

import { commentController, getCommentController } from "../controllers/comment.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/:blogId", getCommentController);
router.post("/:blogId", authenticate, commentController);

export default router;