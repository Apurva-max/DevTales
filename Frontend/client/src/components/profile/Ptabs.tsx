import { useState } from "react";
import UserBlogs from "./PuserBlogs";
import AboutSection from "./PaboutSection";

function ProfileTab() {

    const [tab, setTab] = useState("posts");

    return (

        <div className="mt-8">
            <div className="flex gap-4 border-b">
                <button onClick={() => setTab("posts")}>Posts</button>
                <button onClick={() => setTab("drafts")}>Drafts</button>
                <button onClick={() => setTab("liked")}>Liked</button>
                <button onClick={() => setTab("about")}>About</button>
            </div>

            {tab === "posts" && <UserBlogs />}
            {tab === "drafts" && <UserBlogs show_Drafts />}
            {tab === "about" && <AboutSection />}
        </div>
    )
}

export default ProfileTab;