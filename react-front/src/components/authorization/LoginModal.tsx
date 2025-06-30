import { useSignUp } from "./signUp.store";
import { SignUpAxios } from "../../utilities/loginSignUp.axios";
import { useMessageModalStore } from "../message_Modal/messageModal.store";
import { useModalOpenStore } from "./modalOpen.store";
import { XSquare } from "react-feather";

const LoginModal = () => {
  const loginData = useSignUp((state) => state);

  const modalOpen = useModalOpenStore((state) => state.modalLoginOpen);
  function LoginHandler() {
    const login = SignUpAxios.login;
    login(loginData.email, loginData.password);
    useMessageModalStore.getState().clearError();
    useMessageModalStore.getState().clearMessage();
    useSignUp.getState().resetCredentials();
    useModalOpenStore.getState().setLoginOpen(false);
  }
  return (
    <dialog
      id="my_modal_5"
      className={`modal ${
        modalOpen ? "modal-open" : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <div className="flex flex-row justify-between">
            <h2 className="card-title self-baseline">Login</h2>
            <button
              className="btn"
              onClick={() => useModalOpenStore.getState().setLoginOpen(false)}
            >
              <XSquare />
            </button>
          </div>
          <input
            value={useSignUp.getState().email}
            type="Email"
            placeholder="Email"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setEmail(e.target.value)}
          />
          <input
            value={useSignUp.getState().password}
            type="password"
            placeholder="password"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setPassword(e.target.value)}
          />
          <div className="card-actions justify-end align-top">
            <button onClick={() => LoginHandler()} className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
