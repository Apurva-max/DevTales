import useBlogStore from "../../Store/blogStore";

function PStats() {
  const blogs = useBlogStore((state) => state.blogs);

  const totalBlogs = blogs.length;

  const publicBlogs = blogs.filter((blog) => blog.status === "public").length;

  const privateBlogs = blogs.filter((blog) => blog.status === "private").length;

  const draftBlogs = blogs.filter((blog) => blog.status === "draft").length;

  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes,0);

  const totalViews = blogs.reduce((sum, blog) => sum + blog.views,0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

      <Stat
        label="Total Blogs"
        value={totalBlogs}
      />

      <Stat
        label="Public"
        value={publicBlogs}
      />

      <Stat
        label="Private"
        value={privateBlogs}
      />

      <Stat
        label="Draft"
        value={draftBlogs}
      />

      <Stat
        label="Likes"
        value={totalLikes}
      />

      <Stat
        label="Views"
        value={totalViews}
      />

    </div>
  );
}

interface StatProps {
  label: string;
  value: number;
}

function Stat({
  label,
  value,
}: StatProps) {
  return (
    <div className="card bg-base-200 shadow">
      <div className="card-body items-center">

        <h2 className="text-3xl font-bold">
          {value}
        </h2>

        <p className="opacity-70">
          {label}
        </p>

      </div>
    </div>
  );
}

export default PStats;