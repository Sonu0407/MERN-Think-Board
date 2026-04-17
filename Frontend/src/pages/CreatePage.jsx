import { useState } from "react";
import "../Styles/CreatePage.Styles.css";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
// import BaseUrl from "../utils/fetch.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const BASE_URL =
        import.meta.env.MODE === "development"
          ? `http://localhost:3000/api/notes`
          : "/api";
      // const url = "http://localhost:3000/api/notes";

      // const baseUrl = BaseUrl.concat("/users"); // from utils
      // console.log("BaseUrl", baseUrl);

      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Inform server about the data format
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response) {
        toast.success("Note created successfully!");
        navigate("/");
        setTitle((title) => (title = ""));
        setContent((content) => (content = ""));
      }
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="wrapper">
          <Link to={"/"} className="back-btn">
            <ArrowLeftIcon className="icon" />
            Back to Notes
          </Link>

          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control-content">
                  <label className="label-content">
                    <span className="label-text-content">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
