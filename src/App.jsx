// import { createContext } from "react";
// import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/dashboard";
import { Post } from "./components/post";
import { AllPosts } from "./components/allposts";
import { useNavigate } from "react-router-dom";

// const PostContext = createContext([]);

function App() {
  const loggedin =
    localStorage.getItem("jwtToken") && localStorage.getItem("author");

  const navigate = useNavigate();

  if (!loggedin) {
    return <Login />;
  } else {
    navigate("Dashboard");
  }
}

export { App };
