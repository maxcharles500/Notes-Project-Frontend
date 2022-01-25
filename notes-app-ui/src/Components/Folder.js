import Note from "./Note";
import { Accordion } from "react-bootstrap";


const Folder = ({ 
    folder,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote
}) => {
	return (
		// <DragDropContext>
		// <Droppable droppableId="notes" {...provided.droppableProps} ref={provided.innerRef}>
	  // {(provided) => (
				<Accordion defaultActiveKey="0">
				<Accordion.Item>
					<Accordion.Header>{folder.name}</Accordion.Header>
					<Accordion.Body>
					{notes.map(note  => {
						if (folder.id === note.folder_id){
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
					</Accordion.Body>
				</Accordion.Item>
				</Accordion>
			// )}
		// </Droppable>
		// </DragDropContext>
	)
}

export default Folder;