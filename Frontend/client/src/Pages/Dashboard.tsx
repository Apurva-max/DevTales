import { useEffect } from "react";
import DashboardL from "../components/dashboard/cards/Dashboard";
import useBlogStore from "../Store/blogStore";
import { getMyBlogs } from "../api/blog";

function Dashboard() {
  const setBlogs = useBlogStore((state) => state.setBlogs);

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const response = await getMyBlogs();

        console.log("Response: ", response);
        console.log("Blogs: ", response.blogs);

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
          bookmarked: false,
          comments: [],
          readingTime: blog.readingTime,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        }));

        setBlogs(formattedBlogs);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMyBlogs();
  }, []);

  return <DashboardL />;
}

export default Dashboard;