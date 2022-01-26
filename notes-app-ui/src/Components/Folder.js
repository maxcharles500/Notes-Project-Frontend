import Note from "./Note";
import { Accordion } from "react-bootstrap";
import { Droppable, Draggable } from "react-beautiful-dnd";


const Folder = ({ 
		i,
    folder,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote
}) => {
	// const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)
	// console.log(sortedNotes)
	return (
		<Accordion defaultActiveKey="0">
		<Accordion.Item>
			<Accordion.Header>{folder.name}</Accordion.Header>
			<Droppable key={folder.id} droppableId={folder.id.toString()} index={i}>
			{(provided, snapshot) => (
				<div 
					ref={provided.innerRef} 
					style={{background: snapshot.isDraggingOver ? 'lightblue' : null}}
					{...provided.droppableProps}
				>
					<Accordion.Body>
						{notes.map((note, i) => {
							if (note.folder_id == folder.id) {
								return (
									<Draggable key={note.id} draggableId={note.id.toString()} index={i}>
										{(provided) => (
											<div 
												ref={provided.innerRef} 
												{...provided.draggableProps} 
												{...provided.dragHandleProps}
											>
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
					{provided.placeholder}
				</div>
			)}
			</Droppable>
		</Accordion.Item>
		</Accordion>
	)
}

export default Folder;