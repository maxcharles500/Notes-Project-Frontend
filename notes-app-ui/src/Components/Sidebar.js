import { useState } from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import Folder from "./Folder";
import Note from "./Note";

const Sidebar = ({
    folders,
    onAddFolder,
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
      // LEGACY: SORTING MOVED TO SERVER
      // const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
    
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <DropdownButton id="dropdown-basic-button" title="Add" size="sm">
            <Dropdown.Item onClick={onAddFolder}>Folder</Dropdown.Item>
            <Dropdown.Item onClick={onAddNote}>File</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="app-sidebar-notes">
          {/* Folderless Notes */}
          {notes.map(note => {
            if (note.folder_id == null) {
              return (
                <Note 
                  key={note.id}
                  note={note}
                  onDeleteNote={onDeleteNote}
                  activeNote={activeNote}
                  setActiveNote={setActiveNote}
                />
              )
            }
          })}

          {/* Folders with Notes */}
          {folders.map(folder => (
            <Folder 
              key={folder.id}
              folder={folder}
              notes={notes}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          ))}

        </div>
      </div>
    );
  };
  
  export default Sidebar;