import { useModalOpenSore } from "../authorization/modalOpen.store";
import { useSignUp } from "../authorization/signUp.store";
import { useNavbarStore } from "./navbar.store";
import { AlignJustify } from "react-feather";

// component to display the navbar

const Navbar = () => {
  const NavbarStore = useNavbarStore((state) => state);
  const user = useSignUp((state) => state.user);

  return (
    <div className="navbar bg-base-200 flex flex-row justify-between items-center">
      <div className="navbar-start w-20">
        <div
          className={`dropdown ${NavbarStore.isClosed ? "dropdown-open" : ""}`}
        >
          <div
            role="button"
            onClick={() => NavbarStore.toggle()}
            className="btn m-1"
          >
            <AlignJustify />
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a onClick={() => NavbarStore.toggle()}>Home Page</a>
            </li>
            <li>
              <a
                onClick={() => {
                  NavbarStore.toggle();
                  useModalOpenSore.getState().setSignUpOpen(true);
                }}
              >
                SignUp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end min-w-64">
        <div className="ps-4 flex flex-row items-center gap-3">
          <p className="text-sm">{user}Tweets</p>
          <div
            className={`avatar ${
              useSignUp.getState().isLoged ? " hidden " : ""
            } avatar-placeholder`}
          >
            <div
              className={`btn hidden bg-neutral text-neutral-content rounded-full`}
            >
              <span
                className="text-xs"
                onClick={() => {
                  useModalOpenSore.getState().setLoginOpen(true);
                }}
              >
                Login
              </span>
            </div>
          </div>
          <div
            className={`avatar ${
              useSignUp.getState().isLoged ? "" : " hidden "
            } avatar-placeholder`}
          >
            <div className="btn bg-neutral text-neutral-content rounded-full">
              <span
                className="text-xs"
                onClick={() => {
                  useSignUp.getState().resetCredentials;
                  useSignUp.getState().clearTokens;
                  useSignUp.getState().setUser("");
                  useSignUp.getState().setIsLogedIn(false);
                  useModalOpenSore.getState().setLogoutOpen(true);
                  console.log("clicked logout");
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
