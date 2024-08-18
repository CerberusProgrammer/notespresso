import React from "react";
import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import { Timestamp } from "firebase/firestore";
import NoteCard from "./NoteCard";
import { Note } from "./NotesState";

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote, loading, error } =
    useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    const newNote = {
      title,
      content,
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
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1>My Notes</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreateNote}>Create Note</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "300px",
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
          />
        ))}
      </div>
    </div>
  );
}
