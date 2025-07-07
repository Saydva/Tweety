import { SignUpAxios } from "../../utilities/axiosHandlers/loginSignUp.axios";
import { useModalOpenStore } from "../authorization/modalOpen.store";
import { useSignUp } from "../authorization/signUp.store";
import { useNavbarStore } from "./navbar.store";
import { AlignJustify } from "react-feather";
import { useAuthHandler } from "../authorization/authHandler";

const Navbar = () => {
  const { toggle, isClosed } = useNavbarStore((state) => state);

  const { isLoged, user } = useSignUp((state) => state);
  const { setSignUpOpen, setLoginOpen } = useModalOpenStore((state) => state);
  const { devSignUpLogin } = SignUpAxios;
  const { LogOutOnClick } = useAuthHandler();

  function signOnClick() {
    toggle();
    setSignUpOpen(true);
  }

  return (
    <div className="navbar bg-base-200 flex flex-row justify-between items-center">
      <div className="navbar-start w-20">
        <div className={`dropdown ${isClosed ? "dropdown-open" : ""}`}>
          <div role="button" onClick={() => toggle()} className="btn m-1">
            <AlignJustify />
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a onClick={() => toggle()}>Home Page</a>
            </li>
            <li className={`${isLoged ? "hidden " : ""}`}>
              <a onClick={() => signOnClick()}>SignUp</a>
            </li>
          </ul>
        </div>
      </div>
      <p
        className="text-sm border-2 border-error rounded-sm p-1 btn"
        onClick={() => {
          devSignUpLogin();
        }}
      >
        Prefill login
      </p>
      <div className="navbar-end min-w-64">
        <div className="ps-4 flex flex-row items-center gap-3">
          <p className="text-sm">{user}Tweets</p>
          <div
            className={`avatar ${isLoged ? " hidden " : ""} avatar-placeholder`}
          >
            <div
              className={`btn hidden bg-neutral text-neutral-content rounded-full`}
            >
              <span className="text-xs" onClick={() => setLoginOpen(true)}>
                Login
              </span>
            </div>
          </div>
          <div
            className={`avatar ${isLoged ? "" : " hidden "} avatar-placeholder`}
          >
            <div className="btn bg-neutral text-neutral-content rounded-full">
              <span className="text-xs" onClick={() => LogOutOnClick()}>
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
