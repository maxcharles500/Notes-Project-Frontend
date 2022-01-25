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
    )
}

export default Folder;