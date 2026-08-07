import { useMemo, useState, useEffect } from "react";
import { getAllBlogs } from "../api/blog";

import BlogCard from "../components/Blog/BlogCard";
import SearchBar from "../components/Search/search_bar";
import CategoryFilter from "../components/Search/Category_filter";
import Drop_down from "../components/Search/Drop_Down";

import useBlogStore from "../Store/blogStore";
import { getBookmarks } from "../api/bookmark";

function Home() {
  const blogs = useBlogStore((state) => state.blogs);
  const setBlogs = useBlogStore((state) => state.setBlogs);

  console.log("Blogs in Zustand:", blogs);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const limit = 9;

  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(page, limit);

      const bookmarkResponse = await getBookmarks();

      const bookmarkedId = bookmarkResponse.bookmarks.map((blog: any) => blog.id);

      console.log("Full API Response:", response);
      console.log("Blogs from API:", response.blogs);

      const formattedBlogs = response.blogs.map((blog: any) => ({
        id: blog.id,

        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,

        author: blog.author,
        authorId: blog.authorId,

        authorAvatar: blog.avatar,

        category: blog.category,

        tags: [],

        coverImage: blog.coverImage,

        status: blog.status,

        likes: blog.likes,

        views: blog.views,

        bookmarked: bookmarkedId.includes(blog.id),

        comments: [],

        readingTime: blog.readingTime,

        createdAt: blog.createdAt,

        updatedAt: blog.updatedAt,
      }));

      console.log("Formatted Blogs:", formattedBlogs);

      setBlogs(formattedBlogs);

      setTotalPages(
        Math.ceil(response.totalBlogs / limit)
      )
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const filteredBlogs = useMemo(() => {
    let result = blogs.filter(
      (blog) => blog.status === "public"
    );

    if (search.trim()) {
      result = result.filter(
        (blog) =>
          blog.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          blog.excerpt
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          blog.author
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(
        (blog) => blog.category === category
      );
    }

    switch (sort) {
      case "likes":
        result.sort((a, b) => b.likes - a.likes);
        break;

      case "views":
        result.sort((a, b) => b.views - a.views);
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [blogs, search, category, sort]);

  console.log("Filtered Blogs:", filteredBlogs);

  return (
    <div className="container mx-auto px-6 py-10">

      <div className="hero min-h-[35vh]">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold">
              Welcome to DevTales 🚀
            </h1>

            <p className="py-6 text-lg">
              Share Blogs, Projects & Thoughts
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <CategoryFilter
          category={category}
          setCategory={setCategory}
        />

        <Drop_down
          sort={sort}
          setSort={setSort}
        />
      </div>

      <h2 className="text-3xl font-bold mb-6">
        Latest Blogs
      </h2>
{filteredBlogs.length === 0 ? (
  <div className="text-center py-20 text-gray-500">
    No blogs found.
  </div>
) : (
  <>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>

    <div className="flex justify-center items-center gap-2 mt-10 relative z-[9999]" style={{ pointerEvents: "auto"}}>

      <button
        className="btn btn-primary"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`btn ${
            page === i + 1 ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="btn btn-primary"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

    </div>
  </>
)}

</div>

); 
}


export default Home;