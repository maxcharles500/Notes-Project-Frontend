import Note from "./Note";
import { Accordion } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";


const Folder = ({ 
    folder,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote
}) => {
	return (
				<Accordion defaultActiveKey="0">
				<Accordion.Item>
					<Accordion.Header>{folder.name}</Accordion.Header>
					<Accordion.Body>
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
											{/* {provided.placeholder} */}
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