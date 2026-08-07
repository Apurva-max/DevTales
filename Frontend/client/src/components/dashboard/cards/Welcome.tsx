import use_Auth_Store from "../../../Store/authStore";
import useBlogStore from "../../../Store/blogStore";

function Welcome() {
    const user = use_Auth_Store((state) => state.user);
    
    const blogs = useBlogStore((state) => state.blogs);

    const drafts = blogs.filter((blog) => blog.status === 'draft');

    return (
        <div className="bg-primary text-primary-content rounded-xl p-6 shadow">
            <h2 className="text-3xl font-bold">
                Welcome Back, {user?.name}
            </h2>

            <p className="mt-2">
                Keep Writing. You Have{" "}
                <span className="font-bold">
                    {drafts.length}
                </span>{" "}
                Draft{drafts.length !== 1 && "s"}.
            </p>
        </div>
    );
}

export default Welcome;
