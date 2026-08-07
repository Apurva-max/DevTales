import { Link } from "react-router-dom";
import {FaHeart,FaBookmark,FaRegBookmark,FaBookOpen} from "react-icons/fa";

import type { BlogPost } from "../../Store/blogStore";
import { addBookmark, removeBookmark } from "../../api/bookmark";
import { useState } from "react";


interface Props {
  blog: BlogPost;
}

function BlogCard({ blog }: Props) {
  const [saved, setSaved] = useState(blog.bookmarked ?? false);

  async function handleBookmark() {
  try {
    if (!saved) {
      await addBookmark(blog.id);
      setSaved(true);
    } else {
      await removeBookmark(blog.id);
      setSaved(false);
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
      
      {blog.coverImage && (
        <figure className="h-56 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-52 object-cover rounded-t-xl"
          />
        </figure>
      )}

      <div className="card-body">

        <h2 className="card-title">
          {blog.title}
        </h2>

        <p className="line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-sm opacity-70">
            {blog.author}
          </span>

          <div className="badge badge-outline">
            {blog.category}
          </div>

        </div>

        <div className="flex justify-between items-center mt-5">

          <div className="flex gap-4">

            <span className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              {blog.likes}
            </span>

            <button
              onClick={handleBookmark}
            >
              {saved ? (
                <FaBookmark className="text-primary text-lg" />
              ) : (
                <FaRegBookmark className="text-lg" />
              )}
            </button>

          </div>

          <Link
            to={`/blog/${blog.id}`}
            className="btn btn-primary btn-sm"
          >
            <FaBookOpen />
            Read
          </Link>

        </div>

      </div>
    </div>
  );
}

export default BlogCard;