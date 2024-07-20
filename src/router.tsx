import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import App from "./pages/App";

  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path : "/app",
      element : <App />
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    }
]);

export default router;