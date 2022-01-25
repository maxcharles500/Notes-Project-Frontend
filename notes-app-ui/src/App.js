import { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";

function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9292/folders")
    .then(r => r.json())
    .then(folders => setFolders(folders));

    fetch("http://localhost:9292/notes")
    .then(r=> r.json())
    .then(notes => setNotes(notes));
  }, []);

  const onAddFolder = () => {
    const newFolder = {
      name: "New Folder"
    };

    fetch("http://localhost:9292/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFolder)
    })
      .then(r => r.json())
      .then(newFolder => {
        setFolders([newFolder, ...folders]);
      })
  }

  const onAddNote = () => {
    const newNote = {
      title: "Untitled Note",
      body: ""
    };

    fetch("http://localhost:9292/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote)
    })
      .then(r => r.json())
      .then(newNote => {
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
      })
  };

  const onDeleteNote = (noteId) => {
    fetch(`http://localhost:9292/notes/${noteId}`, {
      method: "DELETE",
    });

    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        folders={folders}
        onAddFolder={onAddFolder}
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;