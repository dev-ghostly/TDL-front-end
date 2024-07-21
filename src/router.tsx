import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import App from "./pages/App";

  
const router = createBrowserRouter([
    {
      path: "/remindme",
      element: <Home />,
    },
    {
      path: "/remindme/signup",
      element: <Signup />
    },
    {
      path: "/remindme/login",
      element: <Login />
    },
    {
      path : "/remindme/app",
      element : <App />
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    }
]);

export default router;