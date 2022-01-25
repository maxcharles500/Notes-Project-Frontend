import { DropdownButton, Dropdown} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
        <DragDropContext>
          <Droppable droppableId="app-sidebar-notes">
            {(provided) => (
              <div className="app-sidebar-notes" {...provided.droppableProps} ref={provided.innerRef}>
                {/* Folderless Notes */}
                {notes.map((note, i) => {
                  if (note.folder_id == null) {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={i}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Note
                            note={note}
                            onDeleteNote={onDeleteNote}
                            activeNote={activeNote}
                            setActiveNote={setActiveNote}
                          />
                          </div>
                        )}
                      </Draggable>
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };
  
  export default Sidebar;