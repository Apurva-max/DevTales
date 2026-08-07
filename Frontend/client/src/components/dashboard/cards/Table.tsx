import { Link } from "react-router-dom";
import useBlogStore from "../../../Store/blogStore";
import { deleteBlog, getMyBlogs } from "../../../api/blog";

function Table() {

    const blogs = useBlogStore(
        (state) => state.blogs
    );

    const setBlogs = useBlogStore((store) => store.setBlogs);

    async function handleDelete(id: number) {
        
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if(!confirmDelete) return;

        try {
            await deleteBlog(id);

            const response = await getMyBlogs();

            setBlogs(response.blogs);

            alert("Blog deteled successfully");
        } catch (error) {
            
            console.log(error);

            alert("Failed to delete blog");
        }
    }
    

     return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>

              <td>
                {blog.status === "draft" ? (
                  <div className="badge badge-warning">Draft</div>
                ) : blog.status === "private" ? (
                  <div className="badge badge-neutral">Private</div>
                ) : (
                  <div className="badge badge-success">Public</div>
                )}
              </td>

              <td>
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>

              <td>
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${blog.id}`}
                    className="btn btn-xs btn-info"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;