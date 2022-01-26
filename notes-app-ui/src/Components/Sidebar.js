import { DropdownButton, Dropdown} from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Folder from "./Folder";

const Sidebar = ({
    folders,
    onUpdateFolder,
    onAddFolder,
    notes,
    setNotes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,

  }) => {
    // DND HANDLER
    const handleOnDragEnd = (result) => {
      // Return if out of bounds
      if (!result.destination) return;
      const { source, destination, draggableId } = result;
      // Handle if moving note to new folder
      if (source.droppableId !== destination.droppableId) {
        // Update note within notes array with new folder ID
        const updatedNotesArr = notes.map((note) => {
          if (note.id == draggableId) {
            return ({
              ...note,
              folder_id: parseInt(destination.droppableId)
            })
          }
    
          return note;
        });
        fetch(`http://localhost:9292/folders/notes/${draggableId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folder_id: destination.droppableId
          }),
        })
        setNotes(updatedNotesArr);
      }
    }

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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Folders with Notes */}
          {folders.map((folder, i) => (
            <Droppable key={folder.id} droppableId={folder.id.toString()} index={i}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Folder 
                onAddNote={onAddNote}
                  folder={folder}
                  onUpdateFolder={onUpdateFolder}
                  notes={notes}
                  onDeleteNote={onDeleteNote}
                  activeNote={activeNote}
                  setActiveNote={setActiveNote}
                />
                {provided.placeholder}
              </div>
            )}
            </Droppable>
          ))}
        </DragDropContext>
        </div>
      </div>
    );
  };
  
  export default Sidebar;