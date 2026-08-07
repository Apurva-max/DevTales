import { AuthRequest } from "../middleware/auth.js";
import { Response } from "express";
import { getDashboardStats } from "../services/dashboard.js";

export async function dashboardController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        
        const userId = req.user!.id;

        const stats = await getDashboardStats(userId);

        return res.status(200).json({
            success: true,
            stats,
        })
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}