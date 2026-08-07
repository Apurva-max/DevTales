import { Response } from "express";

import { AuthRequest } from "../middleware/auth.js";

import { addLike, removeLike, getLikes } from "../services/likes.js";

export async function addLikeController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user!.id;
    const blogId = Number(req.params.blogId);

    const id = await addLike({
      userId,
      blogId
  });

    return res.status(201).json({
      success: true,
      message: "Blog liked successfully",
      likeId: id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function removeLikeController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user!.id;
    const blogId = Number(req.params.blogId);

    const deleted = await removeLike(
      userId,
      blogId
    );

    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Like removed successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getLikeCountController(
  req: AuthRequest,
  res: Response
) {
  try {

    const blogId = Number(req.params.blogId);

    const userId = req.user!.id;

    const data = await getLikes(
      blogId,
      userId
    );

    return res.status(200).json({
      success: true,
      likes: data.totalLikes,
      liked: data.liked,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}