import { Response } from "express";
import slugify from "slugify";

import { AuthRequest } from "../middleware/auth.js";
import { createBlog, getAllBlogs, getBlogId, updateBlog, incrementViews, deleteBlogs } from "../services/blog.js";
import { getDraftBlogs, publishBlog, unpublishBlog } from "../services/blog.js";
import { getUserBlogs } from "../services/blog.js";

export async function createBlogController(
    req: AuthRequest,
    res: Response
) {
    try {

        console.log(req.body);

        
        const {
            title,
            excerpt,
            content,
            category,
            status,
            coverImage,
        } = req.body; 

        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "Missing Required Fields",
            });
        }

        const slug = slugify(title, {
            lower: true,
            strict: true,
        }) + "-" + Date.now();

        const readingTime = Math.ceil(
            content.split(/\s+/).length / 200
        );

        const blogId = await createBlog({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            status: status || "draft",
            readingTime,
            authorId: req.user!.id,
        });

        return res.status(201).json({
            success: true,
            message: "Blog Created Successfully",
            blogId,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getallBlogsController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const page = Math.max(1, Number(req.query.page) || 1);

        const limit = Math.max(1, Number(req.query.limit) || 10);

        const search = req.params.search as string;

        const category = req.params.category as string;

        const { blogs, totalBlogs} = await getAllBlogs(
            page,
            limit,
            search,
            category
        );

        const totalPages = Math.ceil(totalBlogs/limit);

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages,
            totalBlogs,
            blogs
        })
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
        
    }
}

export async function getblogbyidController(
    req: AuthRequest,
    res: Response
) {
    try {
        
        const id = Number(req.params.id)

        const blog = await getBlogId(id)

        if(!blog) {

            return res.status(404).json({
                success: false,
                message: "Blog Not Found"
            })
        }

        if (blog.status === "private" && blog.authorId !== req.user?.id) 
            {
                return res.status(403).json({
                success: false,
                message: "This blog is private",
            });
        }

        await incrementViews(id);

        return res.status(200).json({
            success: true,
            blog,
        })
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({

            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function updateBlogController(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const id = Number(req.params.id);

        const {
            title,
            excerpt,
            content,
            coverImage,
            category,
            status,
        } = req.body

        const slug = slugify(title, {
            lower: true,
            strict: true,
        }) + "-" + Date.now();

        const readingTime = Math.ceil(
            content.split(" ").length / 200
        )

        const updated = await updateBlog(

            id,

            req.user!.id,

            {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                category,
                status,
                readingTime,
            }
        );

        if(!updated){
            return res.status(403).json({
                success: false,
                message: "You are not allowed to edit this blog",
            })
        }

        return res.json({
            success: true,
            message: "Blog Updated",
        });
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export async function deleteBlogController(
    req: AuthRequest,
    res: Response
) {

    try {
        const id = Number(req.params.id);

        const deleted = await deleteBlogs(
         id,
         req.user!.id   
        )
        
        if(!deleted) {
            return res.json(403).json({
                success: false,
                message: "You are not allowed to delete this blog",
            })
        }

        return res.json({
              success: true,
              message: "Blog Deleted Successfully"  ,
            })
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
        
    }
    
}

export async function getDraftController(
    req: AuthRequest,
    res: Response
) {

    try {
        
        const userId = req.user!.id;

        const blogs = await getDraftBlogs(userId);

        return res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
    
}

export async function publishController(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user!.id;

        const blogId = Number(req.params.id);

        const updated = await publishBlog(
            userId,
            blogId
        );

        if (updated === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog Published Successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function unpublishController(
    req: AuthRequest,
    res: Response
) {

    try {
        
        const userId = req.user!.id;

        const blogId = Number(req.params.id);

        const updated = await unpublishBlog(
            userId,
            blogId
        )

        if(updated == 0) {
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Blog moved to Drafts"
        })
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

export async function getUserBlogsController(
    req: AuthRequest,
    res: Response
) {
    try {

        const blogs = await getUserBlogs(req.user!.id);

        return res.status(200).json({
            success: true,
            blogs,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
