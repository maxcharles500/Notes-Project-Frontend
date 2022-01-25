import Note from "./Note";
import { Accordion } from "react-bootstrap";

const Folder = ({ 
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote
}) => {
    return (
        <div>
        {notes.map(note  => (
            <Note 
              note={note}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
        ))}
        </div>
    )
}

export default Folder;