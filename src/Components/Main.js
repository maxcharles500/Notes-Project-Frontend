import ReactMarkdown from "react-markdown";
import { Badge } from "react-bootstrap";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    const updatedNote = {
      ...activeNote,
      [field]: value,
      updated_at: Date.now()
    }
    fetch(`http://localhost:9292/notes/${activeNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
    onUpdateNote(updatedNote);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const noteTags = activeNote.tags.map(tag => tag)

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        {/* Tags */}
        {noteTags.map(({id, name}) => (
          <Badge key={id} bg="info">{name}</Badge>
        ))}
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;