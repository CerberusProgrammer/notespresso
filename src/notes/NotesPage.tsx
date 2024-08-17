import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import { Timestamp } from "firebase/firestore";

export default function Notes() {
  const { notes, addNote, deleteNote, loading, error } =
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

  return (
    <div>
      <h1>My Notes</h1>
      <div>
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
      <div>
        {notes.map((note, index) => (
          <div key={note.id + index}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <small>Created At: {note.createdAt.toDate().toString()}</small>
            <small>Updated At: {note.updatedAt.toDate().toString()}</small>
            <button onClick={() => handleDeleteNote(note.id)}>
              Delete Note
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
