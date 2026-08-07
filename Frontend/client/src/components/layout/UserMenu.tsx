import { Link } from "react-router-dom";
import {FaUser,FaBookmark,FaChartBar,FaSignOutAlt} from "react-icons/fa";

import use_Auth_Store from "../../Store/authStore";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const user = use_Auth_Store((state) => state.user);
  console.log("Navbar User: ", user);
  const logout = use_Auth_Store((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-ghost flex items-center gap-3"
        >
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "User"
                  )}`
                }

                alt={user?.name}
              />
            </div>
          </div>

          <div className="hidden md:block text-left">
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-xs text-gray-400">
              {user?.email}
            </p>
          </div>
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content z-[100] mt-3 w-72 menu p-3 shadow-xl bg-base-200 rounded-box"
        >
          <li className="menu-title">
            <span>Account</span>
          </li>

          <li>
            <Link to="/profile">
              <FaUser />
              Profile
            </Link>
          </li>

          <li>
            <Link to="/dashboard">
              <FaChartBar />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/bookmarks">
              <FaBookmark />
              Bookmarks
            </Link>
          </li>

          <div className="divider my-1"></div>

          <li>
            <button
                className="text-error"
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
            >
                <FaSignOutAlt />
                Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserMenu;