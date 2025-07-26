import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./tweets/store/tweetStorageUtils";
import { useUserStore } from "./user/user.store/user.store";
import HomeComp from "./home/HomeComp";
import Navbar from "./navbar/Navbar";
import SignUp from "./user/signUp/SignUp";
import Login from "./user/login/Login";

function App() {
  const { loadTweetsFromLS } = useLocalStorage();
  const { isLoggedIn } = useUserStore();
  console.log("App isLoggedIn:", isLoggedIn);

  useEffect(() => {
    loadTweetsFromLS();
  }, []);

  return (
    <div className="App flex flex-col h-screen w-xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeComp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
