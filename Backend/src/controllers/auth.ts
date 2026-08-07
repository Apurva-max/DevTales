import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generate_Token } from "../utils/jwt.js";

import { create_user,find_user} from "../services/auth.js";



export async function register(
    req: Request,
    res: Response
) {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existing_user = await find_user(email);

        if(existing_user){
            return res.status(409).json({
                message: "Email Already exists"
            })
        }

        const hashed_pass = await bcrypt.hash(password, 10);

        const id = await create_user({
            name,
            email,
            password: hashed_pass,
        });

        return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            userId: id,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        })
        
    }
}

export async function login(
    req: Request,
    res: Response
) {

    try {
        
        const {

            email,
            password,
        } = req.body;

        if(!email || !password){

            return res.status(400).json({
                success: false,
                messagae: "Email and Password are required",
            });
        }

        const user = await find_user(email);

        if(!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            })
        }

        const token = generate_Token({
            id: user.id,
            email: user.email,
        })

        return res.status(200).json({
            success: true,
            message: "Login Successfully",

            token,

            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }
        })

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}