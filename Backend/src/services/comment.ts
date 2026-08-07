import pool from "../config/db.js"

interface createComment {
    content: string,
    userId: number,
    blogId: number
}

export async function createComment(comment: createComment) {
    
    const [result]: any = await pool.query(
        `
            INSERT INTO comments
            (
                content,
                userId,
                blogId
            )
            VALUES(?, ?, ?)
        `,

        [
            comment.content, 
            comment.userId, 
            comment.blogId
        ]
    );

    return result.insertId;
}

export async function getBlogComment(blogId: number) {

    const [rows] = await pool.query(
        `
            SELECT

            comments.*,
            users.name,
            users.avatar

            FROM comments

            INNER JOIN users
            ON comments.userId = users.id

            WHERE blogId = ?

            ORDER BY createdAt DESC
        `,
        [blogId]
    )

    return rows;
    
}