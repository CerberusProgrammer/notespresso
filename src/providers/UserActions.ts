import { User } from "firebase/auth";

export type UserActions =
  | { type: "login"; user: User }
  | { type: "logout" }
  | { type: "loading" }
  | { type: "error"; error: string };
