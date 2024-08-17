import { Note } from "./NotesState";

export type NotesActions =
  | { type: "setNotes"; notes: Note[] }
  | { type: "addNote"; note: Note }
  | { type: "updateNote"; note: Note }
  | { type: "deleteNote"; noteId: string }
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "clearError" }
  | { type: "clearNotes" };
