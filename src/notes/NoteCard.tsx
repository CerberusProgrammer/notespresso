import { useState } from "react";
import { Note } from "./NotesState";
import "./NoteCard.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  note: Note;
  onTap: () => void;
  onUpdateTitle: (noteId: string, newTitle: string) => void;
};

export default function NoteCard({ note, onTap, onUpdateTitle }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (title !== note.title) {
      onUpdateTitle(note.id, title);
    }
  };

  return (
    <div className="note-card">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          className="note-title-input"
        />
      ) : (
        <h1 onClick={handleTitleClick}>{note.title}</h1>
      )}
      <p>{note.content}</p>
      <small>Created At: {note.createdAt.toDate().toString()}</small>
      <button onClick={onTap}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
