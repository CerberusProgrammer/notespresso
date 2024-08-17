import { UserActions } from "./user/UserActions";
import { UserState } from "./UserState";

export const UserReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case "login":
      return { user: action.user, loading: false, error: null };
    case "logout":
      return { user: null, loading: false, error: null };
    case "loading":
      return { ...state, loading: true, error: null };
    case "error":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
