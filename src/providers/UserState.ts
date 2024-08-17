import { User } from "firebase/auth";

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export const initialUserState: UserState = {
  user: null,
  loading: false,
  error: null,
};
