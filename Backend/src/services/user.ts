import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db.js";


export async function getProfile(
    userId: number
) {
    
    const [rows] = await pool.query<RowDataPacket[]>(
        `
            SELECT 
            id,
            name,
            email,
            avatar,
            bio,
            occupation,
            location,
            github,
            linkedin,
            createdAt
            FROM users
            WHERE id = ?
        `,
        [userId]
    )

    return rows[0];

}

interface updateP {

    name: string,
    bio?: string,
    occupation?: string,
    location?: string,
    github?: string,
    linkedin?: string

}

export async function updateProfile(
    userId: number,
    data: updateP
) {
    
    const [result] = await pool.query<ResultSetHeader>(
        `   
        UPDATE users
        SET
        name = ?,
        bio = ?,
        occupation = ?,
        location = ?,
        github = ?,
        linkedin = ?
        WHERE id = ?
        `,

        [
            data.name,
            data.bio,
            data.occupation,
            data.location,
            data.github,
            data.linkedin,
            userId,
        ]
    )

    return result.affectedRows;
}

export async function getUserId(
    userId: number
) {

    const [rows] = await pool.query<RowDataPacket[]>(
        `
        SELECT
            id, 
            name,
            avatar,
            bio,
            occupation,
            location,
            github,
            linkedin,
            createdAt
        FROM users
        WHERE id = ?
            
        `,
        [userId]
    )

    return rows[0];
    
}

export async function getUserBlogs(userId: number) {

    const[rows] = await pool.query<RowDataPacket[]>(
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
                WHERE blogs.authorId = ?
                GROUP BY 
                    blogs.id, 
                    users.name, 
                    users.avatar
                ORDER BY blogs.createdAt DESC
            `,
            [userId]
    )

    return rows;
    
}

function calculateStreaks(days: string[]) {
  if (days.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      writingDays: 0,
    };
  }

  const dates = days.map((d) => new Date(d));

  let longestStreak = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff =
      (dates[i].getTime() - dates[i - 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longestStreak = Math.max(longestStreak, current);
    } else {
      current = 1;
    }
  }

  let currentStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lastDate = new Date(dates[dates.length - 1]);
  lastDate.setHours(0, 0, 0, 0);

  let diffToday =
    (today.getTime() - lastDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffToday <= 1) {
    currentStreak = 1;

    for (let i = dates.length - 2; i >= 0; i--) {
      const diff =
        (lastDate.getTime() - dates[i].getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
        lastDate = dates[i];
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    writingDays: days.length,
  };
}

export async function getWritingStats(userId: number) {
    const[rows] = await pool.query<RowDataPacket[]>(
        `
            SELECT
            DATE_FORMAT(createdAt, '%Y-%m-%d') AS day
            FROM blogs
            WHERE blogs.authorId = ?
            GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
            ORDER BY day ASC
        `,
        [userId]
    );

    const days = rows.map((r) => r.day);

    return calculateStreaks(days);
}

export async function getCalender(userId: number) {

    const [rows] = await pool.query<RowDataPacket[]>(
        `
           SELECT
            DATE_FORMAT(createdAt, '%Y-%m-%d') AS day,
            COUNT(*) AS posts
            FROM blogs
            WHERE blogs.authorId = ?
            GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d')
            ORDER BY day ASC
        `,
        [userId]
    );

    console.log(rows);

    return rows;
}

export async function updateAvatar(
    userId: number,
    avatar: string
) {
    const [result] = await pool.query<ResultSetHeader>(
        `
            UPDATE users
            SET avatar = ?
            WHERE id = ?
        `,
        [avatar, userId]
    );

    return result.affectedRows;
}

export async function removeAvatar(userId: number) {
    
    await pool.query(
        `
            UPDATE users
            SET avatar = NULL
            WHERE id = ?
        `,

        [userId]
    )
}