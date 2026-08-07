import { AuthRequest } from "../middleware/auth.js";
import { Response } from "express";
import { getProfile, updateProfile, getUserId, getUserBlogs, getWritingStats, getCalender, updateAvatar, removeAvatar } from "../services/user.js";

export async function profileController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId = req.user!.id;

        const user = await getProfile(userId);

        return res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function updateController(
    req: AuthRequest,
    res: Response
) {
    try {
        
        const userId = req.user!.id;

        const {
            name,
            bio,
            occupation,
            location,
            github,
            linkedin,
        } = req.body;

        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            })
        }

        const updated = await updateProfile(
            userId,

            {
                name,
                bio,
                occupation,
                location,
                github,
                linkedin
            }
        )

        if(updated === 0){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        })
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function userController(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user!.id;

        const user = await getUserId(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function getUserBlogController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId = req.user!.id;

        const blogs = await getUserBlogs(userId);

        return res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function writingController(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user!.id;

        const streak = await getWritingStats(userId);

        return res.status(200).json({
            success: true,
            streak,
        });
    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function calendarController(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user!.id;

        const calendar = await getCalender(userId);

        return res.status(200).json({
            success: true,
            calendar,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function avatarController(
    req: AuthRequest,
    res: Response
) {
    try {

        const userId = req.user!.id;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        // Upload to Cloudinary
        const avatar = (req.file as any).path;
        // Save URL in DB
        await updateAvatar(userId, avatar);

        return res.status(200).json({
            success: true,
            avatar,
            message: "Avatar uploaded successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function removeAvatarController(
    req: AuthRequest,
    res: Response
) {

    try {
        const userId = req.user!.id;

        await removeAvatar(userId);

        return res.json({
            success: true,

        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
    
}