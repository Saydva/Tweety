import { Route, Routes } from "react-router";
import { useUIStore } from "./stores/ui/uiStore";

//components
import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/appComponents/HomePage";
import SignUpPage from "./components/authComponents/SignUpPage";
import LogInPage from "./components/authComponents/LogInPage";
import { useTweetyActions } from "./components/appComponents/tweetyComponents/useTweety.Actions";

function App() {
  const { theme } = useUIStore();
  const { handleGetAll } = useTweetyActions();

  return (
    <div data-theme={`${theme}`} className="min-h-screen ">
      <NavBar />
      <div className="flex flex-col items-center ">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="LogIn" element={<LogInPage />} />
        </Routes>
        <button className="btn" onClick={handleGetAll}>
          Test?
        </button>
      </div>
    </div>
  );
}

export default App;
