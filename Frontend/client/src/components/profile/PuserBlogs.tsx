import { Link } from "react-router-dom";
import {FaHeart,FaEye,FaEdit,FaTrash,FaBookOpen} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getMyBlogs, deleteBlog } from "../../api/blog";


interface Props {
  show_Drafts?: boolean;
}

function UserBlogs({
  show_Drafts = false,
}: Props) {
  
  const [blogs, setBlogs ] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      
      try {
        const response = await getMyBlogs();
        setBlogs(response.blogs);

      } catch (error) {
        
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const filtered_Blogs = blogs.filter((blog) =>
    show_Drafts
      ? blog.status === "draft"
      : blog.status !== "draft"
  );

  async function handle_Delete(id: number) {
    
    const ok = window.confirm("Delete this Blog?");

    if(!ok) return;

    try {
      
      await deleteBlog(id);

      setBlogs((prev) => 
        prev.filter((blog) => blog.id !== id)
      );

      alert("Blog Deleted Successfullt");
    } catch (error) {
      
      console.log(error);

      alert("Failed to delete blog");
    }
  }

  if(loading) {
    return (
      <div className="text-center py-10">
        Loading....
      </div>
    )
  }

  if (filtered_Blogs.length === 0) {
    return (
      <div className="text-center py-10 opacity-70">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">

      {filtered_Blogs.map((blog) => (

        <div
          key={blog.id}
          className="card bg-base-200 shadow-md hover:shadow-xl transition"
        >
          <div className="card-body">

            <div className="flex justify-between items-start">

              <div>

                <h2 className="card-title text-2xl">
                  {blog.title}
                </h2>

                <p className="opacity-70 text-sm mt-1">
                  {blog.category}
                </p>

              </div>

              <StatusBadge
                status={blog.status}
              />

            </div>

            <p className="mt-3 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex gap-6 mt-5 text-sm">

              <span className="flex items-center gap-2">

                <FaHeart className="text-red-500" />

                {blog.likes}

              </span>

              <span className="flex items-center gap-2">

                <FaEye className="text-blue-500" />

                {blog.views}

              </span>

              <span>
                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

            <div className="flex gap-3 mt-6">

              <Link
                to={`/blog/${blog.id}`}
                className="btn btn-primary btn-sm"
              >
                <FaBookOpen />
                Read
              </Link>

              <Link
                to={`/edit/${blog.id}`}
                className="btn btn-warning btn-sm"
              >
                <FaEdit />
                Edit
              </Link>

              <button
                onClick={() =>
                  handle_Delete(blog.id)
                }
                className="btn btn-error btn-sm"
              >
                <FaTrash />
                Delete
              </button>

            </div>

          </div>
        </div>

      ))}

    </div>
  );
}

interface BadgeProps {
  status:
    | "public"
    | "private"
    | "draft";
}

function StatusBadge({
  status,
}: BadgeProps) {
  if (status === "public") {
    return (
      <div className="badge badge-success">
        Public
      </div>
    );
  }

  if (status === "private") {
    return (
      <div className="badge badge-warning">
        Private
      </div>
    );
  }

  return (
    <div className="badge badge-neutral">
      Draft
    </div>
  );
}

export default UserBlogs;