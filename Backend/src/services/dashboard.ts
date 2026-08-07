import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db.js";

export async function getDashboardStats(
    userId: number
) {
    
    const [blog] = await pool.query<RowDataPacket[]>(

        `
            SELECT COUNT(*) AS totalBlogs
            FROM blogs
            WHERE authorId = ?
        `,

        [userId]
    )


    const [like] = await pool.query<RowDataPacket[]>(

        `   
            SELECT COUNT(*) AS totalLikes
            FROM likes
            INNER JOIN blogs
            ON likes.blogId = blogs.id
            WHERE blogs.authorId = ?
        `,
        [userId]
    );


    const [comment] = await pool.query<RowDataPacket[]>(
        `
            SELECT COUNT(*) AS totalComments
            FROM comments
            INNER JOIN blogs
            ON comments.blogId = blogs.id
            WHERE blogs.authorId = ?
        `,

        [userId]
    );


    const [bookmark] = await pool.query<RowDataPacket[]>(
        `
            SELECT COUNT(*) AS totalBookmarks
            FROM bookmarks
            INNER JOIN blogs
            ON bookmarks.blogId = blogs.id
            WHERE blogs.authorId = ?
        `,

        [userId]
    );

    return{

        totalBlogs: blog[0].totalBlogs,

        totalLikes: like[0].totalLikes,

        totalComments: comment[0].totalComments,

        totalBookmark: bookmark[0].totalBookmarks
    }
}