import { createContext, Dispatch } from "react";
import { initialUserState, UserState } from "./UserState";
import { UserActions } from "./user/UserActions";

export const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserActions>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  state: initialUserState,
  dispatch: () => {},
  loginWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});
