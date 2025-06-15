import { useSignUp } from "./signUp.store";
import { SignUpAxios } from "../../utilities/loginSignUp.axios";
import { useMessageModalStore } from "../message_Modal/messageModal.store";
import { useModalOpenSore } from "./modalOpen.store";

const LoginPage = () => {
  const loginData = useSignUp((state) => state);
  const login = SignUpAxios.login;
  const modalOpen = useModalOpenSore((state) => state.modalLoginOpen);
  return (
    <dialog
      id="my_modal_5"
      className={`modal ${
        modalOpen ? "modal-open" : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <h2 className="card-title self-baseline">Login</h2>
          <input
            value={useSignUp.getState().email}
            type="Email"
            placeholder="Email"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setEmail(e.target.value)}
          />
          <input
            value={useSignUp.getState().password}
            type="text"
            placeholder="password"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setPassword(e.target.value)}
          />

          <div className="card-actions justify-end align-top">
            <button
              onClick={() => {
                login(loginData.email, loginData.password);
                useMessageModalStore.getState().clearError();
                useMessageModalStore.getState().clearMessage();
                useSignUp.getState().resetCredentials();
                useModalOpenSore.getState().setLoginOpen(false);
              }}
              className="btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginPage;
