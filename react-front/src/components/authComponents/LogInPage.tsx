import { useLogInHandler } from "./onLogInHandler";

const LogInPage = () => {
  const {
    handleLogin,
    email,
    password,
    isEmailValid,
    isPasswordValid,
    setEmail,
    setPassword,
    loading,
    error,
  } = useLogInHandler();

  const prefillLogin = () => {
    setEmail("test@gmail.com");
    setPassword("Test1234");
  };

  return (
    <div>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <form onSubmit={handleLogin} name="login-form">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

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
          <button className="text-xs btn" type="button" onClick={prefillLogin}>
            prefill
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
