import { Link } from "react-router";
import "../Styles/NoteCard.Styles.css";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour
    // window message
    if (!window.confirm("Are you sure want to delete this note?")) return;

    try {
      const BASE_URL =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/api/notes/${id}`
          : "/api";
      // const url = `http://localhost:3000/api/notes/${id}`;
      const response = await fetch(BASE_URL, {
        method: "DELETE",
      });
      // check response
      if (response) {
        toast.success("Note deleted successfully");
        setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted note
      }
    } catch (error) {
      console.log("Error in handle Delete", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link to={`/note/${note._id}`} className="card-header">
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="card-content">{note.content}</p>
        <div className="card-action">
          <span className="card-createdAt">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <div className="card-edit">
            <PenSquareIcon className="edit-icon" />
            <button
              className="card-delete"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="delete-icon" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
