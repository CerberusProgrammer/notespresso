import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import { Timestamp } from "firebase/firestore";
import NoteCard from "./NoteCard";
import { Note } from "./NotesState";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NotesPage.css";

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dialog, setDialog] = useState(false);

  const handleCreateNote = async () => {
    const newNote = {
      title,
      content,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    setDialog(false);
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

  const titleCharCount = title.length;
  const contentCharCount = content.length;
  const titleMaxLength = 50;
  const contentMaxLength = 255;

  return (
    <>
      <button
        className="add-note-button"
        onClick={() => {
          setDialog(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="add-note-icon" />
        <span className="add-note-text">Add new note</span>
      </button>
      <div className="notes-container">
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
      {dialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <input
              type="text"
              placeholder="Some title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={titleMaxLength}
              className={titleCharCount > titleMaxLength ? "error" : ""}
            />
            <div className="char-counter">
              {titleCharCount}/{titleMaxLength}
            </div>
            <textarea
              placeholder="Your awesome note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={contentMaxLength}
              className={contentCharCount > contentMaxLength ? "error" : ""}
            />
            <div className="char-counter">
              {contentCharCount}/{contentMaxLength}
            </div>
            <div className="dialog-buttons">
              <button
                className="cancel-button"
                onClick={() => setDialog(false)}
              >
                Cancel
              </button>
              <button className="create-button" onClick={handleCreateNote}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}