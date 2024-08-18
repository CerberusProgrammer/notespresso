import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import { Timestamp } from "firebase/firestore";
import NoteCard from "./NoteCard";
import { Note } from "./NotesState";

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    const newNote = {
      title: "xdasas",
      content: "xdasas",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await addNote(newNote);
    setTitle("");
    setContent("");
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId);
  };

  const handleUpdateNote = async (note: Note) => {
    await updateNote(note);
  };

  return (
    <>
      <button
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          zIndex: 1,
        }}
        onClick={() => {
          setTitle("xdasas");
          setContent("xdasas");
          handleCreateNote();
        }}
      >
        Crear
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            onTap={() => handleDeleteNote(note.id)}
            onUpdateTitle={(_, title) =>
              handleUpdateNote({
                ...note,
                title,
                updatedAt: Timestamp.now(),
              })
            }
            onUpdateContent={(_, content) =>
              handleUpdateNote({
                ...note,
                content,
                updatedAt: Timestamp.now(),
              })
            }
          />
        ))}
      </div>
    </>
  );
}
