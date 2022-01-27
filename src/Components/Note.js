import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Note = ({ 
	note, 
	onDeleteNote, 
	activeNote, 
	setActiveNote 
}) => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const handleDelete = () => {
		onDeleteNote(note.id)
		handleCloseModal()
	}
    
	return (
		<div
			className={`app-sidebar-note ${note.id === activeNote && "active"}`}
			onClick={() => setActiveNote(note.id)}
		>
		<div className="sidebar-note-title">
			<strong>{note.title}</strong>
			<button onClick={handleShowModal}>
				🗑️
			</button>
			</div>

			<p>{note.body && note.body.substr(0, 100) + "..."}</p>
			<small className="note-meta">
				Last Modified{" "}
				{new Date(note.updated_at).toLocaleDateString("en-GB", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</small>

			{/* Delete Modal */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
				<Modal.Title>{note.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete {note.title}?</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
						No, take me back!
				</Button>
				<Button variant="danger" onClick={handleDelete}>
						Delete
				</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Note;