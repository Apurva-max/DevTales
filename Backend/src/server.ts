import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
    
    try {
        const connection = await pool.getConnection();

        console.log("My Sql Connected");

        connection.release();

        app.listen(PORT, () => {
            console.log(
                `Server running at http://localhost:${PORT}`
            )
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();