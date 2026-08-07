import type { BlogPost } from "../../Store/blogStore";
import BookmarkCard from "./Bcard";

interface Props {
  blogs: BlogPost[];
}

function BookmarksGrid({ blogs }: Props) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BookmarkCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
}

export default BookmarksGrid;