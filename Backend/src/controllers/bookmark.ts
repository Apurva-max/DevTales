import { AuthRequest } from "../middleware/auth.js";
import { Response } from "express";
import { addBookmark, removeBookmark, getBookmark } from "../services/bookmark.js";

export async function addController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId= req.user!.id;
        const blogId = Number(req.params.blogId);

        const id = await addBookmark({
            userId,
            blogId
        });

        return res.status(201).json({
            success: true,
            message: "Blog bookmarked successfully",
            bookmarkId: id,
        })
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function removeController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId = req.user!.id;
        const blogId = Number(req.params.blogId);

        const deleted = await removeBookmark(
            userId,
            blogId
        )

        if(deleted === 0) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not Found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Bookmark removed successully",
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function getController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId = req.user!.id;

        const bookmarks = await getBookmark(userId);

        return res.status(200).json({
            success: true,
            bookmarks,
        })
    
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}