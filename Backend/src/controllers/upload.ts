import { Request,Response } from "express";

export async function uploadController(
    req: Request,
    res: Response
) {

    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            })
        }

        const file = req.file as Express.Multer.File & {path: string};

        return res.status(200).json({
            success: true,
            imageUrl: file.path,
        })
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}