import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserProvider from "../user/UserProvider";
import NotesProvider from "../notes/NotesProvider";
import LoginPage from "../user/LoginPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <NotesProvider>
          <HomePage />
        </NotesProvider>
      </UserProvider>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
