import pool from "../config/db.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface CreateBlog {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    category: string;
    status: "public" | "private" | "draft";
    readingTime: number;
    authorId: number;
}

export async function createBlog(blog: CreateBlog) {

    const [result] = await pool.query<ResultSetHeader>(
        `
        INSERT INTO blogs (
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            status,
            readingTime,
            authorId
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            blog.title,
            blog.slug,
            blog.excerpt || null,
            blog.content,
            blog.coverImage || null,
            blog.category,
            blog.status,
            blog.readingTime,
            blog.authorId,
        ]
    );

    return result.insertId;
}

export async function getAllBlogs(
    page: number,
    limit: number,
    search?: string,
    category?: string
) {
    
    const offset = (page-1) * limit;

    let query = `
        SELECT 
        blogs.*,
        users.name AS author,
        users.avatar,
        COUNT(likes.id) AS likes
        FROM blogs
        INNER JOIN users
        ON blogs.authorId = users.id

        LEFT JOIN likes
        ON likes.blogId = blogs.id
        
        WHERE blogs.status= 'public'

    `;

    let countQuery = `
        SELECT COUNT(*) AS totalBlogs
        FROM blogs
        WHERE status = 'public'
    `

    const conditions: string[] = [];
    const values: any[] = [];

    if(search){
        conditions.push("blogs.title LIKE ?");

        values.push(`%${search}%`);
    }

    if(category) {
        conditions.push(
            "blogs.category = ?"
        );

        values.push(category);
    }

    if(conditions.length > 0) {
        const whereClause = 
        " AND " +
        conditions.join(" AND ");

        query += whereClause;
        countQuery += whereClause;
    }

    query += `
        GROUP BY blogs.id
        ORDER BY blogs.createdAt DESC
        LIMIT ?
        OFFSET ?
    `;

    values.push(limit);
    values.push(offset);

    const [blogs] = await pool.query<RowDataPacket[]>(

        query,
        values
    )

    const countValues = values.slice(0, values.length - 2);

    const [countRows] = await pool.query<RowDataPacket[]>(
        countQuery,
        countValues
    )

    return {blogs, totalBlogs: countRows[0].totalBlogs}
}

export async function getBlogId(id: number) {
    
    const [rows]: any = await pool.query<RowDataPacket[]>(

        `
            SELECT
            blogs.*,
            users.name AS author,
            users.avatar,
            COUNT(likes.id) AS likes

            FROM blogs

            INNER JOIN users
            ON blogs.authorId = users.id

            LEFT JOIN likes
            ON likes.blogId = blogs.id

            WHERE 
            blogs.id = ?

            GROUP BY blogs.id
        `,

        [id]
    );

    return rows[0];
}

export async function incrementViews(id: number) {

    console.log("Incrementing view for blog:", id);
    
    await pool.query(
        `
            UPDATE blogs
            SET views = views + 1

            WHERE id  = ?
        `,

        [id]
    )
}

export async function updateBlog(
    id: number,
    authorId: number,
    data: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage?: string;
        category: string;
        status: "public" | "private" | "draft";
        readingTime: number;
    }
) {
    
    const [result]: any = await pool.query(
        `
            UPDATE blogs

            SET
            title=?,
            slug=?,
            excerpt=?,
            content=?,
            coverImage=?,
            category=?,
            status=?,
            readingTime=?

            WHERE

            id=?
            AND
            authorId=?
        `,

        [
            data.title,
            data.slug,
            data.excerpt,
            data.content,
            data.coverImage,
            data.category,
            data.status,
            data.readingTime,

            id,
            authorId,
        ]
    );

    return result.affectedRows;
}

export async function deleteBlogs(

    id: number,
    authorId: number,
) {

    const [result]: any = await pool.query(
        `
        DELETE FROM blogs

        WHERE
        id = ?
        AND
        authorId = ?
        `,
        [id, authorId]
    );

    return result.affectedRows;
    
}

export async function getDraftBlogs(
    userId: number
) {
    
    const [rows] = await pool.query<RowDataPacket[]>(
        `   
            SELECT* 
            FROM blogs
            WHERE
            authorId = ?
            AND
            status = "draft"
        `,
        [userId]
    )

    return rows;

}

export async function publishBlog(

    userId: number,
    blogId: number
) {
    
    const [result] = await pool.query<ResultSetHeader>(
        `
            UPDATE blogs
            SET status = 'public'
            WHERE
            id = ?
            AND
            authorId = ?
        `,
            [blogId, userId]
    )

    return result.affectedRows;
}

export async function unpublishBlog(
    userId: number,
    blogId: number
) {

    const [result] = await pool.query<ResultSetHeader>(
        `
            UPDATE blogs
            SET status = 'draft'
            WHERE
            id = ?
            AND
            authorId = ?
        `,

        [blogId, userId]
    )

    return result.affectedRows;
    
}

export async function getUserBlogs(userId: number) {

    console.log("getUserBlogs called");

    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT
            blogs.*,
            users.name AS author,
            users.avatar,
            COUNT(likes.id) AS likes

        FROM blogs

        INNER JOIN users
        ON blogs.authorId = users.id

        LEFT JOIN likes
        ON likes.blogId = blogs.id

        WHERE blogs.authorId = ?

        GROUP BY
            blogs.id,
            users.name,
            users.avatar

        ORDER BY blogs.createdAt DESC
    `, [userId]);

    console.log("Rows = ",rows);

    return rows;
}