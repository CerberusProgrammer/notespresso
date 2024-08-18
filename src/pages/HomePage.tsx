import { useContext } from "react";
import { UserContext } from "../user/UserContext";
import NotesPage from "../notes/NotesPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";

export default function HomePage() {
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="home-container">
        <div className="appbar">
          <FontAwesomeIcon icon={faMugHot} className="coffee-icon" />
          <div className="appbar-title">Notespresso</div>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="logout-icon"
            />
          </button>
        </div>
        <NotesPage />
      </div>
    </>
  );
}
