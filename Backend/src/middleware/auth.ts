import { Request, Response, NextFunction } from "express";
import { verify_Token } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {

            return res.status(401).json({
                message: "Access Denied",
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message: "Token Missing",
            })
        }

        const decoded = verify_Token(token) as {
            id: number;
            email: string;
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}