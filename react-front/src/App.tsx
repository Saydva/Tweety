import { Route, Routes } from "react-router";
import LogInPage from "./components/authComponents/LogInPage";
import SignUpPage from "./components/authComponents/SignUpPage";
import NavBar from "./components/navBar/NavBar";
import { useUIStore } from "./stores/ui/uiStore";
import HomePage from "./components/appComponents/HomePage";

function App() {
  const { theme } = useUIStore();

  return (
    <div data-theme={`${theme}`} className="min-h-screen ">
      <NavBar />
      <div className="flex flex-col items-center ">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="LogIn" element={<LogInPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
