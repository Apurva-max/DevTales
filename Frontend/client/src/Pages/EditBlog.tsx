import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LexicalEditor from "../components/editor/Lexical";
import { Blog_Categories } from "../constants/categories";

import { getSingleBlog,updateBlog} from "../api/blog";

function EditBlog() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState<any>(null);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState<"public" | "private" | "draft">("public");

  useEffect(() => {
    async function fetchBlog() {
      try {
        if (!id) return;

        const response = await getSingleBlog(Number(id));

        const blogData = response.blog;

        setBlog(blogData);

        setTitle(blogData.title);

        setContent(blogData.content);

        setCategory(blogData.category);

        setStatus(blogData.status);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlog();
  }, [id]);


  async function handleSave() {
    if (!blog) return;

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    if (!content.trim()) {
      alert("Please enter content");
      return;
    }

    try {
      await updateBlog(blog.id, {
        title,

        excerpt: content.slice(0, 180),

        content,

        category,

        status,
      });

      alert("Blog Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Unable to update blog");
    }
  }


  if (!blog) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-10">

      <h1 className="text-4xl font-bold mb-8">
        Edit Blog
      </h1>

      <input
        className="input input-bordered w-full mb-6"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="select select-bordered w-full mb-6"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        {Blog_Categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered w-full mb-6"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as
              | "public"
              | "private"
              | "draft"
          )
        }
      >
        <option value="public">
          Public
        </option>

        <option value="private">
          Private
        </option>

        <option value="draft">
          Draft
        </option>
      </select>

      <LexicalEditor
        initialContent={content}
        onChange={setContent}
      />

      <div className="mt-8 flex gap-4">

        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save Changes
        </button>

        <button
          className="btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default EditBlog;