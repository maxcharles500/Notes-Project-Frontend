import { useEffect, useState } from "react";
import {DragDropContext} from 'react-beautiful-dnd';
import "./App.css";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";


function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)

// INITIALIZE FETCH //
  useEffect(() => {
    fetch("http://localhost:9292/folders/recent")
    .then(r => r.json())
    .then(folders => setFolders(folders));

    fetch("http://localhost:9292/notes")
    .then(r=> r.json())
    .then(notes => setNotes(notes));
  }, []);


// POST //
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

  const onAddNote = (folder) => {
    const newNote = {
      title: "Untitled Note",
      body: "",
      folder_id: folder
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

// PATCH //
  const onUpdateFolder = (updatedFolder) => {
    const updatedFoldersArr = folders.map((folder) => {
      if (folder.id === updatedFolder.id) {
        return updatedFolder;
      }
      return folder;
    });
    setFolders(updatedFoldersArr);
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

// DELETE //
  const onDeleteFolder = (folderId) => {
    fetch(`http://localhost:9292/folders/notes/${folderId}`, {
      method: "DELETE",
    });
    setFolders(folders.filter(({ id }) => id !== folderId));
  };

  const onDeleteNote = (noteId) => {
    fetch(`http://localhost:9292/notes/${noteId}`, {
      method: "DELETE",
    });
    setNotes(notes.filter(({ id }) => id !== noteId));
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
        onAddFolder={onAddFolder}
        onUpdateFolder={onUpdateFolder}
        onDeleteFolder={onDeleteFolder}
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