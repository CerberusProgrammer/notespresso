import React, { useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";
import { initialUserState } from "./UserState";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
