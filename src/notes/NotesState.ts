export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
};

export type NoteState = {
  notes: Note[];
  loading: boolean;
  error: string;
};

export const initialNoteState: NoteState = {
  notes: [],
  loading: false,
  error: "",
};
