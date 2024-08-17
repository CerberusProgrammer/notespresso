import { useContext } from "react";
import { UserContext } from "./providers/UserContext";

export default function HomePage() {
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div>HomePage</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
