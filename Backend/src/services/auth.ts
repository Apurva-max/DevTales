import pool from "../config/db.js";
import { User } from "../models/user.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function find_user(email: string){
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

export async function create_user(user:User) {
    const [result] = await pool.execute<ResultSetHeader>(
        `
        INSERT INTO users(
        
            name,
            email,
            password,
            avatar,
            bio,
            occupation,
            location,
            github,
            linkedin
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            user.name,
            user.email,
            user.password,
            user.avatar || null,
            user.bio || null,
            user.occupation || null,
            user.location || null,
            user.github || null,
            user.linkedin || null,
    
        ]
    );

    return result.insertId;
}