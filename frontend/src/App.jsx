import { useEffect, useState } from "react";
import api, { setAuthToken } from "./api";
import socket from "./socket";
import "./index.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [content, setContent] = useState("");

  const login = async () => {
    const res = await api.post("/api/auth/login", { username, password });
    setToken(res.data.token);
    setAuthToken(res.data.token);
    const notesRes = await api.get("/api/notes");
    setNotes(notesRes.data);
  };

  const createNote = async () => {
    const res = await api.post("/api/notes", {
      title: "Untitled Note",
      content: ""
    });
    setNotes([...notes, res.data]);
    openNote(res.data);
  };

  const openNote = (note) => {
    setActiveNote(note);
    setContent(note.content);
    socket.emit("join-note", { noteId: note._id });
  };

  useEffect(() => {
    socket.on("code-sync", ({ content }) => setContent(content));
    return () => socket.off("code-sync");
  }, []);

  const updateContent = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit("code-update", { noteId: activeNote._id, content: value });
  };

  if (!token) {
    return (
      <div className="center">
        <div className="login">
          <h1>Live Code Notes</h1>
          <p>Collaborative real-time code editor</p>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Enter Workspace</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside>
        <div className="brand">Live Code Notes</div>
        <button onClick={createNote}>New Note</button>
        {notes.map((note) => (
          <div
            key={note._id}
            className={activeNote?._id === note._id ? "item active" : "item"}
            onClick={() => openNote(note)}
          >
            {note.title}
          </div>
        ))}
      </aside>

      <main>
        {activeNote ? (
          <textarea value={content} onChange={updateContent} />
        ) : (
          <div className="hint">Create or select a note to start collaborating</div>
        )}
      </main>
    </div>
  );
}
