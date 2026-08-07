import { Link } from "react-router-dom";
import use_Auth_Store from "../../Store/authStore";
import UserMenu from "./UserMenu";

function Navbar() {
  const isAuthenticated = use_Auth_Store(
    (state) => state.isAuthenticated
  );

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-6">
  
      <div className="flex-1">
        <Link
          to="/"
          className="text-3xl font-bold text-primary"
        >
          DevTales
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-outline"
            >
              Register
            </Link>
          </>
        ) : (
          <UserMenu />
        )}
      </div>
    </div>
  );
}

export default Navbar;