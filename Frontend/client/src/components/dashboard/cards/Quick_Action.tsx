import { Link } from "react-router-dom";

function Quick_Actions() {

    return (

        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">
                Quick Action
            </h2>

            <div className="flex gap-4 flex-wrap">
                <Link to="/write" className="btn btn-primary">

                + New Blog
                </Link>

                <button className="btn btn-outline">
                    Cintinue Draft
                </button>

                <Link to="/profile" className="btn btn-secondary">
                View Profile</Link>
            </div>
        </div>
    )
}

export default Quick_Actions;