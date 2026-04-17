import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import "../Styles/HomePage.Styles.css";
import NoteNotFound from "../components/NoteNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);

  /*
  • Fetch data
  • Set up timers
  • Listen for events
  • Talk to external services
  */
  // these are things that we use for use effect

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const url = "http://localhost:3000/api/notes";
        const response = await fetch(url);
        const data = await response.json(); // converting to json
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.log("Error While fetching notes", error);
      } finally {
        setloading(false);
      }
    };

    fetchNotes();
  }, []); // runs once
  return (
    <div>
      <NavBar />
      <div className="notes-block">
        {loading && <div className="loading-notes">Loading notes...</div>}
        {notes.length > 0}

        {notes.length === 0 && <NoteNotFound />}

        {notes.length > 0 && (
          <div className="display-notes">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes} />
                {/* {note.title} | {note.content} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
