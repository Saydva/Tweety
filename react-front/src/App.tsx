import { Route, Routes } from "react-router";
import { useUIStore } from "./stores/ui/uiStore";
import { useAuthStore } from "./stores/auth/auth.store";

//components
import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/appComponents/HomePage";
import SignUpPage from "./components/authComponents/SignUpPage";
import LogInPage from "./components/authComponents/LogInPage";
import { useTweetyActions } from "./components/appComponents/tweetyComponents/utils/useTweety.Actions";
import TweetsList from "./components/appComponents/tweetyComponents/tweetsList/TweetsList";
import { useEffect } from "react";
import AddNewComment from "./components/appComponents/tweetyComponents/newComment/addNewComment";

function App() {
  const { theme } = useUIStore();
  const { handleGetAll } = useTweetyActions();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      handleGetAll();
    }
  }, [isAuthenticated]);

  return (
    <div data-theme={`${theme}`} className="min-h-screen ">
      <NavBar />
      <div className="flex flex-col items-center ">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <TweetsList />
              </>
            }
          />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="LogIn" element={<LogInPage />} />
          <Route path="AddNewComment" element={<AddNewComment />} />
        </Routes>
        {/* <button className="btn" onClick={handleGetAll}>
          Test?
        </button> */}
      </div>
    </div>
  );
}

export default App;
