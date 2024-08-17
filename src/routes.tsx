import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
