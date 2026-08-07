import {ResultSetHeader,RowDataPacket} from "mysql2";
import pool from "../config/db.js";

interface CreateLike {
  userId: number;
  blogId: number;
}

export async function addLike(
  like: CreateLike
) {
  const [result] =
    await pool.query<ResultSetHeader>(
      `
      INSERT INTO likes
      (
        userId,
        blogId
      )
      VALUES (?, ?)
      `,
      [
        like.userId,
        like.blogId
      ]
    );

  return result.insertId;
}

export async function removeLike(
  userId: number,
  blogId: number
) {
  const [result] =
    await pool.query<ResultSetHeader>(
      `
      DELETE FROM likes
      WHERE
        userId = ?
        AND
        blogId = ?
      `,
      [userId, blogId]
    );

  return result.affectedRows;
}

export async function getLikes(
  blogId: number,
  userId: number
) {

  const [countRows] =
    await pool.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS totalLikes
      FROM likes
      WHERE blogId = ?
      `,
      [blogId]
    );

  const [likedRows] =
    await pool.query<RowDataPacket[]>(
      `
      SELECT id
      FROM likes
      WHERE
      blogId = ?
      AND
      userId = ?
      `,
      [blogId, userId]
    );

  return {
    totalLikes: countRows[0].totalLikes,
    liked: likedRows.length > 0,
  };
}