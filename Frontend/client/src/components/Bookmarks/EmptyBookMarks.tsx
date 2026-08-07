import { FaBookmark } from "react-icons/fa";

function Empty_Bookmark() {

    return (

        <div className="card bg-base-100 shadow-md">

            <div className="card-body items-center text-center py-20">

                <FaBookmark className="text-5xl text-primary"/>

                <h2 className="text-2xl font-bold mt-4">
                    No Bookmarks Yet
                </h2>

                <p className="text-base-content/70">
                Save blogs to read them later
                </p>
            </div>
        </div>
    )
}

export default Empty_Bookmark;