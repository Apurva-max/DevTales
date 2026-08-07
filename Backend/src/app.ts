import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import blogRouter from "./routes/blog.js";
import commentRouter from "./routes/comment.js";
import bookmarkRouter from "./routes/bookmark.js";
import likeRouter from "./routes/likes.js";
import userRouter from "./routes/user.js";
import uploadRouter from "./routes/upload.js"
import dashboardRouter from "./routes/dashboard.js";

const app = express();


app.use(cors());
app.use(express.json({ limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb"}));
app.get("/", (req, res) => {res.send("DevTales Backend running");});
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/likes", likeRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/dashboard", dashboardRouter);

export default app; 