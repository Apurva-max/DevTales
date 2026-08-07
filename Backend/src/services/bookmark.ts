import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db.js";

interface createBoomark {
    userId: number,
    blogId: number
}

export async function addBookmark(bookmark: createBoomark) {
    
    const [result] = await pool.query<ResultSetHeader>(
        `
            INSERT INTO bookmarks
            (
                userId,
                blogId
            )

            VALUES(?, ?)
        `,
        [
            bookmark.userId,
            bookmark.blogId
        ]
    );

    return result.insertId;
}

export async function removeBookmark(
    userId: number,
    blogId: number
) {
    const [result] = await pool.query<ResultSetHeader>(
        `
            DELETE FROM bookmarks

            WHERE
            userId = ?
            AND
            blogId = ?
        `, 
        [userId, blogId]
    );

    return result.affectedRows;
}

export async function getBookmark(userId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      blogs.*,
      users.name AS author,
      users.avatar,
      COUNT(likes.id) AS likes

    FROM bookmarks

    INNER JOIN blogs
      ON bookmarks.blogId = blogs.id

    INNER JOIN users
      ON blogs.authorId = users.id

    LEFT JOIN likes
      ON likes.blogId = blogs.id

    WHERE bookmarks.userId = ?

    GROUP BY blogs.id

    ORDER BY bookmarks.createdAt DESC
    `,
    [userId]
  );

  return rows;
}