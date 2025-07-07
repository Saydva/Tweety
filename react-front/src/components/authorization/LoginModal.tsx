import { useSignUp } from "./signUp.store";
import { useAuthHandler } from "./authHandler";
import { useModalOpenStore } from "./modalOpen.store";
import { XSquare } from "react-feather";

const LoginModal = () => {
  const { modalLoginOpen, setLoginOpen } = useModalOpenStore((state) => state);
  const { setEmail, setPassword, email, password } = useSignUp(
    (state) => state
  );
  const { LoginHandler } = useAuthHandler();

  return (
    <dialog
      id="my_modal_5"
      className={`modal ${
        modalLoginOpen ? "modal-open" : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <div className="flex flex-row justify-between">
            <h2 className="card-title self-baseline">Login</h2>
            <button className="btn" onClick={() => setLoginOpen(false)}>
              <XSquare />
            </button>
          </div>
          <input
            value={email}
            type="Email"
            placeholder="Email"
            className="input input-neutral"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="password"
            className="input input-neutral"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions justify-end align-top">
            <button
              onClick={() => {
                LoginHandler();
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

export default LoginModal;
