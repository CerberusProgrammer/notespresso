import { useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../user/UserContext";
import "./loginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state, loginWithEmail, dispatch } = useContext(UserContext);

  const handleEmailLogin = async () => {
    await loginWithEmail(email, password);
  };

  const loginWithGoogle = async () => {
    dispatch({ type: "loading" });
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      dispatch({ type: "login", user: userCredential.user });
      navigate("/");
    } catch (error) {
      const errorCode = error as Error;
      dispatch({ type: "error", error: errorCode.message });
    }
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh",
      }}
    >
      <div className="login-container">
        <h1>Notespresso</h1>
        <p>A cup of notes</p>
        {state.error && <div className="error">Error: {state.error}</div>}
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin}>Login</button>
        <button className="google-button" onClick={loginWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
