import { Router } from "express";
import { authenticate } from "../middleware/auth.js";

import { addLikeController, removeLikeController, getLikeCountController } from "../controllers/likes.js";

const router = Router();

router.post("/:blogId", authenticate, addLikeController);
router.delete("/:blogId", authenticate, removeLikeController);
router.get("/:blogId", authenticate, getLikeCountController);

export default router;
