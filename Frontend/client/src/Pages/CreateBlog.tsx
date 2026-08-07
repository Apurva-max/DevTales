import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blog";

import LexicalEditor from "../components/editor/Lexical";
import { Blog_Categories } from "../constants/categories";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverImage, setCoverImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleSaveDraft() {
    if(!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      
      setLoading(true);

      await createBlog({

        title,
        slug: title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-"),
        excerpt: content.slice(0, 100),
        content,
        coverImage,
        category,
        status: "draft",
        readingTime: Math.ceil(
          content.split(" ").length / 200
        )
      });

      alert("Draft Saved Successfully");

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to save draft"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }


  async function handlePublish() {
    console.log("Publish clicked");

    console.log("isPrivate = ", isPrivate);
    console.log("status = ", isPrivate ? "private" : "public");

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!content.trim()) {
      alert("Please write some content");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    try {
      setLoading(true);

      // console.log("========== BLOG CONTENT ==========");
      // console.log(content);
      // console.log("=================================");

      console.log({title, category, isPrivate, status: isPrivate ? "private" : "public"});
    

     await createBlog({
      title,
      slug: title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-"),

    excerpt: content.slice(0, 180),

    content,

    coverImage,

    category,

    status: isPrivate ? "private" : "public",

    readingTime: Math.ceil(
    content.split(" ").length / 200
  ),
});

      alert("Blog Published!");

      setTitle("");
      setContent("");
      setCategory("");
      setIsPrivate(false);
      setCoverImage(undefined);

      navigate("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to publish blog"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-5xl py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Create Blog
      </h1>

      <input
        type="text"
        placeholder="Enter Blog Title"
        className="input input-bordered w-full mb-6"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-6">
        <label className="label">
          <span className="label-text font-semibold">
            Category
          </span>
        </label>

        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          {Blog_Categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="label">
          <span className="label-text font-semibold">
            Cover Image
          </span>
        </label>

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageUpload}
        />

        {coverImage && (
          <img
            src={coverImage}
            alt="Preview"
            className="mt-4 h-64 w-full rounded-xl object-cover"
          />
        )}
      </div>

      <div className="mb-6">
        <label className="label cursor-pointer justify-start gap-4">
          <span className="label-text">
            {isPrivate ? "Private Journal 🔒" : "Public Jourbnal 🌏"}
          </span>

          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isPrivate}
            onChange={(e) =>{
              console.log("Toggle: ", e.target.checked);
              setIsPrivate(e.target.checked);
            }}
          />
        </label>
      </div>

      <LexicalEditor
        onChange={setContent}
      />

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSaveDraft}
          className="btn btn-outline"
        >
          Save Draft
        </button>

        <button
          onClick={handlePublish}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Publishing..."
            : "Publish Blog"}
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;