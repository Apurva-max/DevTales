import {Routes, Route} from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register"
import Dashboard from "../Pages/Dashboard";
import CreateBlog from "../Pages/CreateBlog";
import BlogDetails from "../Pages/BlogDetails";
import Profile from "../Pages/Profile";
import Protected_Route from "../components/auth/Protected_Route";
import Bookmark_Pages from "../Pages/Bookmark";
import EditBlog from "../Pages/EditBlog";

function AppRouter()  {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Protected_Route> <Dashboard /> </Protected_Route>}/>
            <Route path="/write" element={<Protected_Route> <CreateBlog /> </Protected_Route>}/>
            <Route path="/blog/:id" element={<BlogDetails />}/>
            <Route path="/edit/:id" element={<Protected_Route> <EditBlog /> </Protected_Route>}/>
            <Route path="/profile" element={<Protected_Route><Profile /></Protected_Route>}/>
            <Route path="bookmarks" element={<Protected_Route><Bookmark_Pages /></Protected_Route>}/>
        </Routes>
    )
}

export default AppRouter;