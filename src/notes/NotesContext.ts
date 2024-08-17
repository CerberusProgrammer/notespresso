import { createContext, Dispatch } from "react";
import { initialNoteState, NoteState } from "./NotesState";
import { NotesActions } from "./NotesActions";

export const NotesContext = createContext<{
  state: NoteState;
  dispatch: Dispatch<NotesActions>;
  notes: any[];
  loading: boolean;
  error: string;
  setNotes: (notes: any[]) => void;
  addNote: (note: any) => void;
  updateNote: (note: any) => void;
  deleteNote: (noteId: string) => void;
  loadingNotes: () => void;
  errorNotes: (error: string) => void;
  clearError: () => void;
  clearNotes: () => void;
}>({
  state: initialNoteState,
  dispatch: () => {},
  notes: [],
  loading: false,
  error: "",
  setNotes: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  loadingNotes: () => {},
  errorNotes: () => {},
  clearError: () => {},
  clearNotes: () => {},
});
