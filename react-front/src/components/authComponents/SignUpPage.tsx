import { useSignUpHandler } from "./onSignUpHandler";

const SignUpPage = () => {
  const {
    handleSignUp,
    name,
    email,
    password,
    isEmailValid,
    isPasswordValid,
    loading,
    error,
    setName,
    setEmail,
    setPassword,
  } = useSignUpHandler();

  const prefillSignUp = () => {
    setName("Test User");
    setEmail("test@gmail.com");
    setPassword("Test1234");
  };

  return (
    <div>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <form onSubmit={handleSignUp} name="signup-form">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">SignUp</legend>

          <label className="label">Your name</label>
          <input
            name="name"
            value={name}
            required
            type="text"
            className="input"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            name="email"
            value={email}
            type="email"
            className={`input ${email && !isEmailValid ? "input-error" : ""}`}
            required
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            name="password"
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
            disabled={
              loading || !isEmailValid || !isPasswordValid || !name.trim()
            }
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          <button
            className="text-xs btn "
            type="button"
            onClick={prefillSignUp}
          >
            prefill
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
