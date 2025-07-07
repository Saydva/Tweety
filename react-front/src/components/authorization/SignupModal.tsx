import { useSignUp } from "./signUp.store";
import { useAuthHandler } from "./authHandler";
import { useModalOpenStore } from "./modalOpen.store";
import { XSquare } from "react-feather";
import { regexHandler } from "../../utilities/handlers/regexHandler";

const LoginModal = () => {
  const { signUpHandler } = useAuthHandler();
  const {
    setName,
    setEmail,
    setPassword,
    name,
    email,
    password,
    resetCredentials,
  } = useSignUp((state) => state);
  const { modadSignUpOpen, setSignUpOpen } = useModalOpenStore(
    (state) => state
  );
  const { isValidEmail, isValidPassword } = regexHandler;

  return (
    <dialog
      className={`modal ${
        modadSignUpOpen ? " modal-open " : ""
      } modal-bottom sm:modal-middle`}
    >
      <div className="modal-box">
        <form method="dialog" className="flex flex-col gap-3 bg-content">
          <div className="flex flex-row justify-between">
            <h2 className="card-title self-baseline">Sign Up</h2>
            <button
              className="btn"
              onClick={() => {
                setSignUpOpen(false);
                resetCredentials();
              }}
            >
              <XSquare />
            </button>
          </div>
          <input
            value={name}
            type="text"
            placeholder="Name"
            className="input input-neutral"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row items-center gap-2">
            <input
              value={email}
              type="email"
              placeholder="Email"
              className="input input-neutral"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span
              className={`text-xs text-error ${
                isValidEmail(email) ? " hidden " : ""
              }`}
            >
              not valid email
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input
              value={password}
              type="text"
              placeholder="Password"
              className="input input-neutral"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={`textarea-xs text-error ${
                isValidPassword(password) ? " hidden " : ""
              }`}
            >
              6 characters 1 Uppercase and num.
            </span>
          </div>
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
