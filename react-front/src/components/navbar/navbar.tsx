import { SignUpAxios } from "../../utilities/loginSignUp.axios";
import { useModalOpenStore } from "../authorization/modalOpen.store";
import { useSignUp } from "../authorization/signUp.store";
import { useNavbarStore } from "./navbar.store";
import { AlignJustify } from "react-feather";
import { useHandlerFunctions } from "../../utilities/logoutHandler";
// import { useHandlerFunctions } from "../../utilities/handlerFunctions";

// component to display the navbar

const Navbar = () => {
  // get the navbar store to toggle the navbar
  const NavbarStore = useNavbarStore((state) => state);
  // get the user from the sign up store
  const user = useSignUp((state) => state.user);
  // function to open the login modal
  function loginOpen() {
    useModalOpenStore.getState().setLoginOpen(true);
  }
  // function to handle sign up click
  // it toggles the navbar and sets the sign up modal to open
  function signOnClick() {
    NavbarStore.toggle();
    useModalOpenStore.getState().setSignUpOpen(true);
  }

  const logout = useHandlerFunctions.LogOutOnClick;

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
            <li className={`${useSignUp.getState().isLoged ? "hidden " : ""}`}>
              <a onClick={() => signOnClick()}>SignUp</a>
            </li>
          </ul>
        </div>
      </div>
      <p
        className="text-sm border-2 border-error rounded-sm p-1 btn"
        onClick={() => {
          SignUpAxios.devSignUpLogin();
        }}
      >
        Prefill login
      </p>
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
              <span className="text-xs" onClick={() => loginOpen()}>
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
              <span className="text-xs" onClick={() => logout()}>
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
