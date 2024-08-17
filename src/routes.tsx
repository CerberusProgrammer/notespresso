import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import UserProvider from "./providers/UserProvider";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <HomePage />
      </UserProvider>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
