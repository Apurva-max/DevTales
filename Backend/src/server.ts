import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL Connected");

        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();