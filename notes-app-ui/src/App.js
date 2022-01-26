import { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import {DragDropContext} from 'react-beautiful-dnd';

function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)

  useEffect(() => {
    fetch("http://localhost:9292/folders/recent")
    .then(r => r.json())
    .then(folders => setFolders(folders));

    fetch("http://localhost:9292/notes")
    .then(r=> r.json())
    .then(notes => setNotes(notes));
  }, []);

// CRUD //
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

  const onAddNote = (e) => {
    const newNote = {
      title: "Untitled Note",
      body: "",
      folder_id: e.target.id
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

  const onUpdateFolder = (updatedFolder) => {
    const updatedFoldersArr = folders.map((folder) => {
      if (folder.id === updatedFolder.id) {
        return updatedFolder;
      }
      return folder;
    });

    setFolders(updatedFoldersArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };


// APP //
  return (
    
    <div className="App">
    <DragDropContext>
      <Sidebar
        folders={folders}
        onUpdateFolder={onUpdateFolder}
        onAddFolder={onAddFolder}
        notes={sortedNotes}
        setNotes={setNotes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </DragDropContext>
    </div>
    
  );
}

export default App;