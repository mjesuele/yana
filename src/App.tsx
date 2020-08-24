import React, { FormEvent, useState } from "react";
import css from "./App.module.css";

enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Pink = "pink",
}

type Note = {
  id: number;
  createdAt: Date;
  title: string;
  text: string;
  color: Color;
};

const fixtures: Note[] = [
  {
    color: Color.Blue,
    createdAt: new Date(),
    id: 1234,
    text: "some note",
    title: "hella noteworthy",
  },
  {
    color: Color.Red,
    createdAt: new Date(),
    id: 5678,
    text: "another note",
    title: "duly noted",
  },
];

function App() {
  const [notes, setNotes] = useState<Note[]>(fixtures);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState(Color.Blue);

  const addNote = (e: FormEvent) => {
    e.preventDefault();
    setNotes((ns) => [
      {
        id: Math.floor(Math.random() * 10e7),
        createdAt: new Date(),
        title,
        text,
        color,
      },
      ...ns,
    ]);
    setTitle("");
    setText("");
    setColor(Color.Blue);
  };

  const deleteNote = (id: number) => {
    setNotes((ns) => ns.filter((n) => n.id !== id));
  };

  const colorRadios = (
    <div className={css.colorRadios}>
      {Object.entries(Color).map(([name, value]) => (
        <span key={name}>
          <input
            type="radio"
            id={name}
            value={value}
            checked={color === value}
            onChange={() => setColor(value)}
          />
          <label htmlFor={name}>{name}</label>
        </span>
      ))}
    </div>
  );

  return (
    <div className={css.app}>
      <h1>yet another notes app</h1>
      <form className={css.form} onSubmit={addNote}>
        <div>
          <input
            className={css.titleInput}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <textarea
          className={css.textarea}
          style={{ border: `1px solid ${color}` }}
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        {colorRadios}
        <input type="submit" value="Add Note" />
      </form>
      <ol className={css.notes}>
        {notes.map((note) => (
          <Note note={note} deleteNote={deleteNote} />
        ))}
      </ol>
    </div>
  );
}

type NoteProps = {
  note: Note;
  deleteNote: (id: number) => void;
};

function Note({ note, deleteNote }: NoteProps) {
  return (
    <li
      className={css.note}
      key={note.id}
      style={{ border: `2px solid ${note.color}` }}
    >
      <header>
        <h2>{note.title}</h2>
        <p>
          <time>
            {note.createdAt.toLocaleDateString()}
            <br />
            {note.createdAt.toLocaleTimeString()}
          </time>
        </p>
      </header>
      {note.text.split("\n\n").map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      <DeleteButton onDelete={() => deleteNote(note.id)} />
    </li>
  );
}

function DeleteButton(props: { onDelete: () => void }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <span>
        <button className={css.deleteButton} onClick={props.onDelete}>
          Really Delete?
        </button>
        <button onClick={() => setIsConfirming(false)}>Cancel</button>
      </span>
    );
  }

  return (
    <button className={css.deleteButton} onClick={() => setIsConfirming(true)}>
      Delete Note
    </button>
  );
}

export default App;
