import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import NotesPage from "../notes/NotesPage";

export default function HomePage() {
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          padding: "15px",
        }}
      >
        <h1>Notesspreso</h1>
        <NotesPage />
      </div>
    </>
  );
}
