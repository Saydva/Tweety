import { LogOut, Menu } from "react-feather";
import { useUIStore } from "../../stores/ui/uiStore";
import ThemeButton from "./buttons/ThemeButton";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useAuthActions } from "../../utilities/auth/useAuth.actions";
import { Link } from "react-router";

const NavBar = () => {
  const { navbarOpen, toggleNavbar } = useUIStore();
  const { user } = useAuthStore();
  const { logoutUser } = useAuthActions();

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className={`dropdown ${navbarOpen ? " dropdown-open " : " "}`}>
            <div
              onClick={() => toggleNavbar(!navbarOpen)}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <Menu />
            </div>
            <ul
              onMouseEnter={() => toggleNavbar(true)}
              onMouseLeave={() => toggleNavbar(false)}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className={user !== null ? "hidden" : ""}>
                <Link to="SignUp">SignUp</Link>
              </li>
              <li className={user !== null ? "hidden" : ""}>
                <Link to="Login">LogIn</Link>
              </li>
              <li>
                <button>
                  <LogOut onClick={logoutUser} />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          {user ? `Hello, ${user}` : "Tweety"}
        </div>
        <div className="navbar-end">
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
