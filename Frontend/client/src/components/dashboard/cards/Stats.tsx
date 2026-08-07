import useBlogStore from "../../../Store/blogStore";

function StatsCards() {

    const blogs = useBlogStore((state)=>state.blogs);

    const totalBlogs = blogs.length;

    const drafts = blogs.filter((blog) => blog.status === 'draft').length;

    const likes = blogs.reduce((sum, blog)=>sum+blog.likes , 0);

    const views = blogs.reduce((sum, blog) => sum + blog.views , 0);

    return (

            <div className="grid md:grid-cols-4 gap-6 mt-8">

                <div className="card bg-base-200">
                    <div className="card-body text-center">

                        <h2 className="text-4xl">📝</h2>

                            <p>Total Blogs</p>

                                <h3 className="text-3xl font-bold">
                                    {totalBlogs}
                            </h3>

                        </div>
                    </div>

                    <div className="card bg-base-200">
                        <div className="card-body text-center">

                            <h2 className="text-4xl">❤️</h2>

                                <p>Total Likes</p>

                                <h3 className="text-3xl font-bold">
                                        {likes}
                            </h3>

                        </div>
                </div>

                    <div className="card bg-base-200">
                        <div className="card-body text-center">

                            <h2 className="text-4xl">👀</h2>

                                <p>Total Views</p>

                                    <h3 className="text-3xl font-bold">
                                        {views}
                                </h3>

                            </div>
                        </div>

                    <div className="card bg-base-200">
                        <div className="card-body text-center">

                            <h2 className="text-4xl">📂</h2>

                                <p>Drafts</p>

                                <h3 className="text-3xl font-bold">
                                    {drafts}
                            </h3>

                        </div>
                    </div>

                </div>

            );

        }

export default StatsCards;