import { Router } from "express";

import { authenticate } from "../middleware/auth.js";

import { createBlogController, getallBlogsController,getblogbyidController, updateBlogController, deleteBlogController, getDraftController, publishController,unpublishController } from "../controllers/blog.js";

import {commentController, getCommentController } from "../controllers/comment.js";

import { getUserBlogController} from "../controllers/user.js";

const router = Router();

router.get("/", getallBlogsController);
router.get("/myblogs", authenticate, getUserBlogController);
router.get("/drafts",authenticate,getDraftController);
router.post("/",authenticate,createBlogController);
router.post("/:blogId/comments",authenticate,commentController);
router.get("/:blogId/comments",getCommentController);
router.patch("/:id/publish",authenticate,publishController);
router.patch("/:id/unpublish",authenticate,unpublishController);
router.put("/:id",authenticate,updateBlogController);
router.delete("/:id",authenticate,deleteBlogController);
router.get("/:id",authenticate,getblogbyidController);

export default router;