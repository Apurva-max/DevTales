import { AuthRequest } from "../middleware/auth.js";
import { createComment, getBlogComment } from "../services/comment.js";
import { Response } from "express";

export async function commentController(
    req: AuthRequest,
    res: Response
) {
   
    try {
        const {content} = req.body;

        const blogId = Number(req.params.blogId);

        if(!content) {
            return res.status(400).json({
                success: false,
                response: "Comment is required"
            })
        }

        const id = await createComment({
            content,
            userId: req.user!.id,
            blogId
        })

        return res.status(201).json({
            success: true,
            message: "Comment Added",
            commentId: id,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function getCommentController(
    req: AuthRequest,
    res: Response
) {

    try {
        const blogId = Number(req.params.blogId);

        const comments = await getBlogComment(blogId);

        return res.status(200).json({
            success: true,
            comments,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}