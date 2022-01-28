import { useEffect, useState } from "react";
import "./App.css";
import uuid from "react-uuid";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";


function App() {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [tags, setTags] = useState([]);

  const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)

// INITIALIZE FETCH //
  useEffect(() => {
    fetch("http://localhost:9292/folders/all/recent")
    .then(r => r.json())
    .then(folders => setFolders(folders));

    fetch("http://localhost:9292/notes/all/tags")
    .then(r => r.json())
    .then(notes => setNotes(notes));

    fetch("http://localhost:9292/tags")
    .then(r => r.json())
    .then(tags => setTags(tags));
  }, []);


// POST //
  const onAddFolder = () => {
    const newFolder = {
      id: uuid(),
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
      id: uuid(),
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
        // Prevent mapping error when no tags exist
        newNote.tags = []
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

  const onAddTag = (note, tagName) => {
    const existingTag = tags.find(tag => tag.name === tagName)
    const alreadyTagged = note.tags.find(tag => tag.name === tagName)
    if (!!alreadyTagged) {
      console.log("This tag already exists")
    }
    else if (!!existingTag) {
      const updatedNotesArr = [...notes]
      updatedNotesArr.forEach(n => {
        if (n.id === note.id) {
          n.tags.push(existingTag)
        }
        return n.tags
      })
      fetch(`http://localhost:9292/notes/${note.id}/tags/${existingTag.id}/add`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingTag)
      })
      setNotes(updatedNotesArr)
      setTags([...tags, existingTag])
    }
    else {
      const newTag = {
        id: uuid(),
        name: tagName,
      }
      const updatedNotesArr = [...notes]
      updatedNotesArr.forEach(n => {
        if (n.id === note.id) {
          n.tags.push(newTag)
        }
        return n.tags
      })
      fetch(`http://localhost:9292/notes/${note.id}/tags/${newTag.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTag)
      })
      setNotes(updatedNotesArr)
      setTags([...tags, newTag])
    }
  }

  const onRemoveTag = (note, tag) => {
    fetch(`http://localhost:9292/notes/${note.id}/tags/${tag.id}/remove`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag)
    })
    const updatedNotesArr = [...notes]
    updatedNotesArr.forEach(note => {
      note.tags = note.tags.filter(t => t !== tag)
    })
    setNotes(updatedNotesArr)
  }

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
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
      <Main 
        activeNote={getActiveNote()} 
        onUpdateNote={onUpdateNote}
      />
    </div>
    
  );
}

export default App;