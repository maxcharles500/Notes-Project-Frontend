import Note from "./Note";

import { Accordion, Button } from "react-bootstrap";
import { Droppable, Draggable } from "react-beautiful-dnd";


const Folder = ({ 
		i,
    folder,
    onUpdateFolder,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote,
    onAddNote
}) => {
  const onEditFolder = (e) => {
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

	return (
		<Accordion defaultActiveKey="0">
		<Accordion.Item>
			<Accordion.Header>
        <input className="form-control" type="text" onChange={(e) => onEditFolder(e)} value={folder.name} ></input>
      </Accordion.Header>
			<Droppable key={folder.id} droppableId={folder.id.toString()} index={i}>
			{(provided, snapshot) => (
				<div 
					ref={provided.innerRef} 
					style={{background: snapshot.isDraggingOver ? 'lightblue' : null}}
					{...provided.droppableProps}
				>
					<Accordion.Body>
            <Button id={folder.id} title="Add" size="sm" onClick={(e) => onAddNote(e)}>
              New File
            </Button>
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