import { useSignUp } from "./signUp.store";
import { SignUpAxios } from "../../utilities/loginSignUp.axios";
import { useMessageModalStore } from "../message_Modal/messageModal.store";
import { useModalOpenSore } from "./modalOpen.store";
import { use } from "react";

const LoginPage = () => {
  const signUpData = useSignUp((state) => state);
  const signUp = SignUpAxios.signUp;
  const modalOpen = useModalOpenSore((state) => state.modadSignUpOpen);
  return (
    <dialog
      className={`modal ${
        modalOpen ? " modal-open " : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <h2 className="card-title self-baseline">Login</h2>
          <input
            value={useSignUp.getState().name}
            type="text"
            placeholder="Name"
            className="input input-secondary"
            onChange={(e) => useSignUp.getState().setName(e.target.value)}
          />

          <input
            value={useSignUp.getState().email}
            type="email"
            placeholder="Email"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setEmail(e.target.value)}
          />
          <input
            value={useSignUp.getState().password}
            type="text"
            placeholder="Password"
            className="input input-neutral"
            onChange={(e) => useSignUp.getState().setPassword(e.target.value)}
          />

          <div className="card-actions justify-end">
            <button
              onClick={() => {
                signUp(signUpData.name, signUpData.email, signUpData.password);
                useMessageModalStore.getState().clearError();
                useMessageModalStore.getState().clearMessage();
                useSignUp.getState().resetCredentials();
                useModalOpenSore.getState().setSignUpOpen(false);
              }}
              className="btn"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginPage;
