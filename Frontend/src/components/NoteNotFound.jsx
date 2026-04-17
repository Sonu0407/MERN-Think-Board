import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";
import "../Styles/NoteNotFound.Styles.css";

const NoteNotFound = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <NotebookIcon className="empty-icon" />
      </div>
      <h3 className="empty-title">!No notes yet</h3>
      <p className="empty-text">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link to={"/create"} className="empty-button">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NoteNotFound;
