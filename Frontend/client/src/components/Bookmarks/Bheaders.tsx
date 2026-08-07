import { FaBookmark } from "react-icons/fa";

function Header() {

    return(

        <div className="bg-base-100 rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-content p-4 rounded-full">
                    <FaBookmark className="text-2xl"/>
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        BookMarks
                    </h1>

                    <p className="text-base-content/70 mt-1">
                    Your Saved blogs for reading later.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header;