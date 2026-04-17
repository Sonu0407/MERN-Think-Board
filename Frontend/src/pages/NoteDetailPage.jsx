import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Loader2, Loader2Icon, Trash2Icon } from "lucide-react";
import "../Styles/NoteDetailPage.Styles.css";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const BASE_URL =
          import.meta.env.MODE === "development"
            ? `http://localhost:3000/api/notes/${id}`
            : "/api";
        // const url = `http://localhost:3000/api/notes/${id}`;
        const response = await fetch(BASE_URL, {
          method: "GET",
        });

        // convert to json
        const data = await response.json(); // changing to json take time

        console.log(data);

        // check response
        if (response) {
          setNote(data);
        }
      } catch (error) {
        console.log("Error while fetching note by id", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // console.log({ note });

  if (loading) {
    return (
      <div className="">
        <LoaderIcon className="" />
      </div>
    );
  }
  const handleDelete = async () => {
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
        navigate("/");
      }
    } catch (error) {
      console.log("Error in handle Delete", error);
      toast.error("Failed to delete note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() && !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      const BASE_URL =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/api/notes/${id}`
          : "/api";
      // const url = `http://localhost:3000/api/notes/${id}`;
      const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
        }),
      });
      // check response
      if (response) {
        toast.success("Note Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in handle Save", error);
      toast.error("Failed to Save the note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="top-bar">
          <Link to={"/"} className="back-link">
            <ArrowLeftIcon className="icon" />
            Back to Notes
          </Link>
          <button className="delete-btn" onClick={handleDelete}>
            {/* onClick={handleDelete} add this in button later */}
            <Trash2Icon className="icon" />
            Delete Note
          </button>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note-title"
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-content">Content</span>
              </label>
              <textarea
                placeholder="Write your note here.."
                className="textarea"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions">
              <button
                className="save-btn"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
