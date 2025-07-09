import { useInputStore } from "../../stores/auth/input.store";
import { validationRegex } from "../../utilities/validation/regex";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useSignUpHandler } from "./onSignUpHandler";
import { signUpPrefill } from "../../utilities/auth/prefill.actions";

const SignUpPage = () => {
  const { loading, error } = useAuthStore();
  const { setName, setEmail, setPassword, name, email, password } =
    useInputStore();
  const isEmailValid = validationRegex.email(email);
  const isPasswordValid = validationRegex.password(password);
  const handleSubmit = useSignUpHandler();

  return (
    <div>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <form onSubmit={handleSubmit} name="signup-form">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">SignUp</legend>

          <label className="label">Your name</label>

          <input
            value={name}
            required
            type="text"
            className="input"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            value={email}
            type="email"
            className={`input ${email && !isEmailValid ? "input-error" : ""}`}
            required
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            value={password}
            type="password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            className={`input ${
              password && !isPasswordValid ? "input-error" : ""
            }`}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <div className="flex flex-row justify-between mt-2">
          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading || !isEmailValid || !isPasswordValid}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          <button
            className="text-xs btn "
            type="button"
            onClick={signUpPrefill}
          >
            prefill
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
