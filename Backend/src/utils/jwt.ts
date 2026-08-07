import jwt from "jsonwebtoken";

interface Token_Pay_Load {
    id: number;
    email: string;
}

export function generate_Token(payLoad: Token_Pay_Load){
    return jwt.sign(
        payLoad,
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES as "7d"
        }
    );
}

export function verify_Token(token: string){
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    )
}