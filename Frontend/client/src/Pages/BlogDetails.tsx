import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaHeart, FaEye } from "react-icons/fa";

import { addComment, getComments, } from "../api/blog";

import { addLike, removeLike, getLikes } from "../api/like";

import useBlogStore, { type Comment} from "../Store/blogStore";

import { getSingleBlog } from "../api/blog";

import parse from "html-react-parser";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function BlogDetails() {
  const { id } = useParams();

  const blogId = Number(id);

  const setBlogLikes = useBlogStore(
    (state) => state.setBlogLikes
  );

  const [blog, setBlog] = useState<any>(null);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);

  const [likes, setLikes] = useState(0);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const blogData = await getSingleBlog(blogId);
        setBlog(blogData.blog);

        const commentData = await getComments(blogId);

        setComments(commentData.comments);

        const likeData = await getLikes(blogId);

        setLikes(likeData.likes);

        setLiked(likeData.liked);

        setBlogLikes(blogId, likeData.likes);

      } catch (error) {
        console.log(error);
      }
    }
     if (!isNaN(blogId)) {
      loadData();
    }

   }, [blogId, setBlogLikes]);

  async function handleComment() {
    if (!comment.trim()) return;

    try {
      await addComment(blogId, comment);

      const commentData = await getComments(blogId);

      setComments(commentData.comments);

      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike() {
    try {
      if (!liked) {
        await addLike(blogId);
      } else {
        await removeLike(blogId);
      }

      const likeData = await getLikes(blogId);

      setLikes(likeData.likes);

      setLiked(likeData.liked);

      setBlogLikes(blogId, likeData.likes);

    } catch (error) {
      console.log(error);
    }
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Blog not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-52 object-cover rounded-t-xl"
        />
      )}

      <div className="mt-8">

        <div className="badge badge-primary">
          {blog.category}
        </div>

        <h1 className="text-5xl font-bold mt-4">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-6 mt-5 text-sm opacity-70">

          <span>👤 {blog.author}</span>

          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <span className="flex items-center gap-1">
            <FaEye />
            {blog.views}
          </span>

        </div>

        <div className="divider"></div>

       <div className="prose max-w-none text-lg leading-9">

  {parse(blog.content, {
    replace(domNode: any) {

  if (
  domNode.name === "pre" &&
  domNode.children?.[0]?.name === "code"
) {
  const code =
    domNode.children[0].children
      ?.map((child: any) => child.data || "")
      .join("") || "";

  const detectedLanguage =
    domNode.children[0].attribs?.class?.replace("language-", "") || "cpp";

  return (
    <SyntaxHighlighter
      language={
        ["cpp", "javascript", "js", "python", "java"].includes(detectedLanguage)
          ? detectedLanguage
          : "cpp"
      }
      style={oneDark}
      customStyle={{
        borderRadius: "12px",
        padding: "20px",
        fontSize: "15px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

return undefined;
    },
  })}

</div>

        <div className="divider"></div>

        <button
          className={`btn ${liked ? "btn-error" : ""}`}
          onClick={handleLike}
        >
          <FaHeart />
          {likes}
        </button>

        <div className="divider"></div>

        <h2 className="text-3xl font-bold">
          Comments
        </h2>

        <textarea
          className="textarea textarea-bordered w-full mt-5"
          rows={4}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-4"
          onClick={handleComment}
        >
          Post Comment
        </button>

        <div className="space-y-5 mt-8">

          {comments.length === 0 && (
            <div className="opacity-60">
              No comments yet.
            </div>
          )}

          {comments.map((item) => (
            <div
              key={item.id}
              className="bg-base-200 rounded-xl p-5"
            >
              <div className="flex justify-between">

                <h3 className="font-bold">
                  {item.name}
                </h3>

                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toLocaleString()}
                </span>

              </div>

              <p className="mt-3">
                {item.content}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default BlogDetails;