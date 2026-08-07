import { Link } from "react-router-dom";
import {FaHome,FaPen,FaBookmark,FaChartBar} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-base-200 p-4">
      <h2 className="text-2xl font-bold mb-6">
        DevTales
      </h2>

      <ul className="menu">
        <li>
          <Link to="/">
            <FaHome />
            Home
          </Link>
        </li>

        <li>
          <Link to="/write">
            <FaPen />
            Write Blog
          </Link>
        </li>

        <li>
          <Link to="/bookmarks">
            <FaBookmark />
            Bookmarks
          </Link>
        </li>

        <li>
          <Link to="/dashboard">
            <FaChartBar />
            Dashboard
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;