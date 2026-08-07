import { Router } from "express";

import { authenticate } from "../middleware/auth.js";
import { profileController, updateController, userController, getUserBlogController, writingController, calendarController, avatarController, removeAvatarController } from "../controllers/user.js";
import upload from "../middleware/upload.js";

const router =  Router();

router.get("/profile", authenticate, profileController);
router.put("/profile", authenticate, updateController);
router.get("/streaks", authenticate, writingController);
router.get("/calendar", authenticate, calendarController);
router.get("/:id", userController);
router.get("/:id/blogs", getUserBlogController);
router.post("/avatar", authenticate, upload.single("avatar"), avatarController);
router.delete("/avatar", authenticate, removeAvatarController);
export default router;