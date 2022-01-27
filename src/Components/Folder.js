import { useEffect, useState } from "react";
import { ContextMenu } from "../Styles/styles";
import { Accordion, Button, Modal } from "react-bootstrap";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Note from "./Note";


const Folder = ({ 
	i,
	folder,
	onUpdateFolder,
	onDeleteFolder,
	notes,
	onDeleteNote,
	activeNote,
	setActiveNote,
	onAddNote
}) => {
	const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)
	// Delete Modal
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const handleDelete = () => {
		onDeleteFolder(folder.id)
		handleCloseModal()
	}

	// Context Menu
	const [showMenu, setShowMenu] = useState(false);
	const [points, setPoints] = useState({ x: 0, y: 0});

	// Folder Rename Input
	const [showRename, setShowRename] = useState(false);
	const handleShowRename = () => setShowRename(true);
	const handleCloseRename = () => setShowRename(false);

	// Context Menu browser click to hide
	useEffect(() => {
		const handleClick = () => setShowMenu(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	// Folder Rename Input browser click to hide
	useEffect(() => {
		const handleRenameClick = () => setShowRename(false);
		window.addEventListener('click', handleRenameClick);
		return () => window.removeEventListener('click', handleRenameClick)
	})

  const handleRenameFolder = (e) => {
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
		<>
		<Accordion defaultActiveKey="0">
		<Accordion.Item>
		{/* Context Menu Div */}
		<div
			onContextMenu={e => {
				e.preventDefault();
				setShowMenu(true);
				setPoints({ x: e.pageX, y: e.pageY });
			}}
		>
			<Accordion.Header>
				{/* Render rename folder input field */}
        {showRename ? 
				<form onSubmit={handleCloseRename}>
					<input autoFocus className="form-control" type="text" onChange={(e) => handleRenameFolder(e)} value={folder.name}></input>
				</form> :
				folder.name
				}
      </Accordion.Header>
		</div>
		{/* Render Context Menu when showMenu is true */}
		{showMenu && (
			<ContextMenu top={points.y} left={points.x}>
				<ul>
					<li onClick={() => onAddNote(folder.id)}>Add File</li>
					<li onClick={handleShowRename}>Rename</li>
					<li onClick={handleShowModal}>Delete</li>
				</ul>
			</ContextMenu>
		)}
			<Droppable key={folder.id} droppableId={folder.id} index={i}>
			{(provided, snapshot) => (
				// Droppable div
				<div 
					ref={provided.innerRef} 
					style={{background: snapshot.isDraggingOver ? 'lightblue' : null}}
					{...provided.droppableProps}
				>
					<Accordion.Body>
						{sortedNotes.map((note, i) => {
							if (note.folder_id == folder.id) {
								return (
									<Draggable key={note.id} draggableId={note.id} index={i}>
										{(provided) => (
											// Draggable div
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
		
		{/* Delete Modal */}
		<Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
			<Modal.Title>{folder.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete {folder.name} and all of its contents?</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleCloseModal}>
					No, I regret everything!
			</Button>
			<Button variant="danger" onClick={handleDelete}>
					Delete
			</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
}

export default Folder;