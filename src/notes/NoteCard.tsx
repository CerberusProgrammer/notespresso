import { useState, useEffect, useRef } from "react";
import { Note } from "./NotesState";
import "./NoteCard.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  note: Note;
  onTap: () => void;
  onUpdateTitle: (noteId: string, newTitle: string) => void;
  onUpdateContent: (noteId: string, newContent: string) => void;
};

export default function NoteCard({
  note,
  onTap,
  onUpdateTitle,
  onUpdateContent,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleContentClick = () => {
    setIsEditingContent(true);
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustTextareaHeight();
  };

  const handleContentBlur = () => {
    setIsEditingContent(false);
    if (content !== note.content) {
      onUpdateContent(note.id, content);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

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
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        onBlur={handleContentBlur}
        className="note-content-input"
      ></textarea>
      <small>Created At: {note.createdAt.toDate().toString()}</small>
      <button onClick={onTap}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
