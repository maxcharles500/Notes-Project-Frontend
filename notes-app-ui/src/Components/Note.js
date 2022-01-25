import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

const Note = ({ 
	note, 
	onDeleteNote, 
	activeNote, 
	setActiveNote 
}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = () => {
		onDeleteNote(note.id)
		handleClose()
	}
    
	return (
					<div
					className={`app-sidebar-note ${note.id === activeNote && "active"}`}
					onClick={() => setActiveNote(note.id)}
					>
					<div className="sidebar-note-title">
						<strong>{note.title}</strong>
						<button onClick={handleShow}>
						🗑️
						</button>

						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
							<Modal.Title>{note.title}</Modal.Title>
							</Modal.Header>
							<Modal.Body>Are you sure you want to delete {note.title}?</Modal.Body>
							<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
									No, I regret everything!
							</Button>
							<Button variant="danger" onClick={handleDelete}>
									Delete
							</Button>
							</Modal.Footer>
						</Modal>
						</div>

						<p>{note.body && note.body.substr(0, 100) + "..."}</p>
						<small className="note-meta">
							Last Modified{" "}
							{new Date(note.updated_at).toLocaleDateString("en-GB", {
									hour: "2-digit",
									minute: "2-digit",
							})}
						</small>
					</div>
	)
}

export default Note;