import type { BlogPost } from "../../Store/blogStore";

interface Props {
  blog: BlogPost;
}

function BookmarkCard({ blog }: Props) {
  return (
    <div className="card bg-base-100 shadow-lg">

      <div className="card-body">

        <h2 className="card-title">
          {blog.title}
        </h2>

        <p >{blog.excerpt.slice(0,150)}</p>

        <div className="flex justify-between text-sm mt-3">

          <span>{blog.author}</span>

          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

        </div>

        <div className="flex justify-between mt-5">

          <div className="flex gap-4">

            <span>❤️ {blog.likes}</span>

            <span>💬 {blog.comments?.length ?? 0}</span>

            <span>🔖</span>

          </div>

          <h2 className="card-title">
              {blog.title}
        </h2>

        </div>

      </div>

    </div>
  );
}

export default BookmarkCard;