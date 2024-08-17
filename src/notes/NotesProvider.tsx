import React, { useReducer, useEffect, useContext } from "react";
import { NotesContext } from "./NotesContext";
import { initialNoteState } from "./NotesState";
import { NotesReducer } from "./NotesReducer";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Note } from "./NotesState";
import { UserContext } from "../user/UserContext";
import { db } from "../../firebaseConfig";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function NotesProvider({ children }: Props) {
  const { state: userState } = useContext(UserContext);
  const [state, dispatch] = useReducer(NotesReducer, initialNoteState);

  useEffect(() => {
    if (userState.user) {
      dispatch({ type: "loading" });
      const q = query(
        collection(db, "notes"),
        where("createdBy", "==", userState.user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notesData: Note[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Note)
        );
        dispatch({ type: "setNotes", notes: notesData });
      });
      return () => unsubscribe();
    }
  }, [userState.user]);

  const setNotes = (notes: Note[]) => dispatch({ type: "setNotes", notes });

  const addNote = async (note: Omit<Note, "id">) => {
    try {
      note.createdBy = userState.user?.uid || "";
      await addDoc(collection(db, "notes"), note);
    } catch (error) {
      const errorMessage = error as Error;
      dispatch({ type: "error", error: errorMessage.message });
    }
  };

  const updateNote = async (note: Note) => {
    try {
      const noteRef = doc(db, "notes", note.id);
      await updateDoc(noteRef, note);
      dispatch({ type: "updateNote", note });
    } catch (error) {
      const errorMessage = error as Error;
      dispatch({ type: "error", error: errorMessage.message });
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      dispatch({ type: "deleteNote", noteId });
    } catch (error) {
      const errorMessage = error as Error;
      dispatch({ type: "error", error: errorMessage.message });
    }
  };

  const loadingNotes = () => dispatch({ type: "loading" });

  const errorNotes = (error: string) => dispatch({ type: "error", error });

  const clearError = () => dispatch({ type: "clearError" });

  const clearNotes = () => dispatch({ type: "clearNotes" });

  return (
    <NotesContext.Provider
      value={{
        state,
        dispatch,
        notes: state.notes,
        loading: state.loading,
        error: state.error,
        setNotes,
        addNote,
        updateNote,
        deleteNote,
        loadingNotes,
        errorNotes,
        clearError,
        clearNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
