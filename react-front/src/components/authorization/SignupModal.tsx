import { useSignUp } from "./signUp.store";
import { SignUpAxios } from "../../utilities/loginSignUp.axios";
import { useMessageModalStore } from "../message_Modal/messageModal.store";
import { useModalOpenStore } from "./modalOpen.store";
import { XSquare } from "react-feather";

const LoginModal = () => {
  const signUpData = useSignUp((state) => state);
  const signUp = SignUpAxios.signUp;
  const modalOpen = useModalOpenStore((state) => state.modadSignUpOpen);
  function signUpHandler() {
    signUp(signUpData.name, signUpData.email, signUpData.password);
    useMessageModalStore.getState().clearError();
    useMessageModalStore.getState().clearMessage();
    useSignUp.getState().resetCredentials();
    useModalOpenStore.getState().setSignUpOpen(false);
  }
  return (
    <dialog
      className={`modal ${
        modalOpen ? " modal-open " : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <div className="flex flex-row justify-between">
            <h2 className="card-title self-baseline">Login</h2>
            <button
              className="btn"
              onClick={() => useModalOpenStore.getState().setSignUpOpen(false)}
            >
              <XSquare />
            </button>
          </div>
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
            <button onClick={() => signUpHandler()} className="btn">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
