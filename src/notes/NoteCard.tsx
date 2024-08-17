import { Note } from "./NotesState";
import "./NoteCard.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  note: Note;
  onTap: () => void;
};

export default function NoteCard({ note, onTap }: Props) {
  return (
    <div className="note-card">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <small>Created At: {note.createdAt.toDate().toString()}</small>
      <small>Updated At: {note.updatedAt.toDate().toString()}</small>
      <button onClick={onTap}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
