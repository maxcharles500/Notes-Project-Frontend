import Folder from "./Folder";

const Sidebar = ({
    folders,
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
          <button onClick={onAddNote}>Add</button>
        </div>
        <div className="app-sidebar-notes">
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