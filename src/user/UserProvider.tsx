import React, { useEffect, useReducer } from "react";
import { UserContext } from "./UserContext";
import { initialUserState } from "./UserState";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserReducer } from "./UserReducer";
import LoginPage from "./LoginPage";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export default function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "login", user });
        navigate("/");
      } else {
        dispatch({ type: "logout" });
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginWithEmail = async (email: string, password: string) => {
    dispatch({ type: "loading" });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "login", user: userCredential.user });
      navigate("/");
    } catch (error) {
      const errorCode = error as Error;
      dispatch({ type: "error", error: errorCode.message });
    }
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

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      await signOut(auth);
      dispatch({ type: "logout" });
      navigate("/login");
    } catch (error) {
      const errorCode = error as Error;
      dispatch({ type: "error", error: errorCode.message });
    }
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, loginWithEmail, loginWithGoogle, logout }}
    >
      {state.loading ? <LoginPage /> : children}
    </UserContext.Provider>
  );
}
