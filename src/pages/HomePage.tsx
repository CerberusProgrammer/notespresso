import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import NotesPage from "../notes/NotesPage";

export default function HomePage() {
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div>HomePage</div>
      <NotesPage />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
