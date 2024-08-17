import { NotesActions } from "./NotesActions";
import { NoteState } from "./NotesState";

export const NotesReducer = (state: NoteState, action: NotesActions) => {
  switch (action.type) {
    case "setNotes":
      return { ...state, notes: action.notes, loading: false };
    case "addNote":
      return { ...state, notes: [...state.notes, action.note] };
    case "updateNote":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.note.id ? action.note : note
        ),
      };
    case "deleteNote":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.noteId),
      };
    case "loading":
      return { ...state, loading: true };
    case "error":
      return { ...state, error: action.error, loading: false };
    case "clearError":
      return { ...state, error: "" };
    case "clearNotes":
      return { ...state, notes: [] };
    default:
      return state;
  }
};
