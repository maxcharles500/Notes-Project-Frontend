import Note from "./Note";
import { Accordion, DropdownButton, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";


const Folder = ({ 

    folder,
    onUpdateFolder,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote,
    onAddNote
}) => {

    const onEditFolder = (e) => {
        console.log('e' , e.target.value)
            fetch(`http://localhost:9292/folders/${folder.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              name: e.target.value
              }),
            })
            onUpdateFolder({
                ...folder,
                name: e.target.value
            })
    }
    
    //update folder functions
	return (
		<Accordion defaultActiveKey="0">
		<Accordion.Item>
			<Accordion.Header>
                 <input className="form-control" type="text" onChange={(e) => onEditFolder(e)} value={folder.name} ></input>
                 {/* <Button id={folder.id} title="Add" size="sm" onClick={(e) => onAddNote(e)}>
                     File
                </Button> */}
            </Accordion.Header>
            {/* <Button id={folder.id} title="Add" size="sm" onClick={(e) => onAddNote(e)}>
                     File
                </Button> */}
			<Accordion.Body>
            <Button id={folder.id} title="Add" size="sm" onClick={(e) => onAddNote(e)}>
                     New File
                </Button>
			{notes.map((note, i) => {
				if (note.folder_id == folder.id) {
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
			</Accordion.Body>
		</Accordion.Item>
		</Accordion>
	)
}

export default Folder;