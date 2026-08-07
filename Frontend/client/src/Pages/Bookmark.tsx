import { useEffect, useState, useMemo } from "react";
import Header from "../components/Bookmarks/Bheaders";
import Search_Bar from "../components/Bookmarks/Bsearch";
import Filter from "../components/Bookmarks/Bfilter";
import BookmarksGrid from "../components/Bookmarks/Bgrid";
import Empty_Bookmark from "../components/Bookmarks/EmptyBookMarks";
import { getBookmarks } from "../api/bookmark";
import type { BlogPost } from "../Store/blogStore";

function Bookmark_Pages() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const response = await getBookmarks();

        console.log(response.bookmarks);

        setBlogs(response.bookmarks);
      } catch (error) {
        console.log(error);
      }
    }

    loadBookmarks();
  }, []);

  const filteredBlogs = useMemo(() => {
      let result = [...blogs];

      if(search.trim()) {
        result = result.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
        )
      }

      if(filter !== "All"){
        result = result.filter((blog) => blog.category === filter)
      }
      return result;
    }, [blogs, search, filter]);

     useEffect(() => {
      console.log("Blogs: ", blogs);
      console.log("Filtered Blogs: ", filteredBlogs);
    }, [blogs, filteredBlogs]);

    console.log(blogs.length);
    console.log(blogs);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Header />

      <Search_Bar
        search={search}
        setSearch={setSearch}
      />

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      {filteredBlogs.length === 0 ? (
        <Empty_Bookmark />
      ) : (
        <BookmarksGrid blogs={filteredBlogs} />
    )}
    </div>
  );
}

export default Bookmark_Pages;
