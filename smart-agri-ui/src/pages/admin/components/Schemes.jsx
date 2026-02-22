import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/schemes";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);

  const loadSchemes = async () => {
    const res = await axios.get(`${API}/all`);
    setSchemes(res.data);
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const data = { title, description, link };

    if (editId) {
      await axios.put(`${API}/update/${editId}`, data);
      alert("Scheme updated ✅");
    } else {
      await axios.post(`${API}/add`, data);
      alert("Scheme added ✅");
    }

    setTitle("");
    setDescription("");
    setLink("");
    setEditId(null);
    loadSchemes();
  };

  const editScheme = (s) => {
    setEditId(s.id);
    setTitle(s.title);
    setDescription(s.description);
    setLink(s.link || "");
  };

  const deleteScheme = async (id) => {
    if (window.confirm("Delete this scheme?")) {
      await axios.delete(`${API}/delete/${id}`);
      loadSchemes();
    }
  };

  return (
    <section className="card card-pad">
      <h3>🏛️ Government Schemes (Admin)</h3>

      <form onSubmit={submit}>
        <input className="input" placeholder="Title"
          value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea className="input" placeholder="Description"
          value={description} onChange={(e) => setDescription(e.target.value)} />

        <input className="input" placeholder="Apply link (URL)"
          value={link} onChange={(e) => setLink(e.target.value)} />

        <button className="btn btn-green">
          {editId ? "Update Scheme" : "Add Scheme"}
        </button>
      </form>

      <hr />

      <h4>📋 Existing Schemes</h4>

      {schemes.map((s) => (
        <div key={s.id} className="list-item">
          <strong>{s.title}</strong>
          <p>{s.description}</p>

          {s.link && (
            <a href={s.link} target="_blank" rel="noreferrer">
              Apply Link 🔗
            </a>
          )}

          <div>
            <button className="btn" onClick={() => editScheme(s)}>Edit</button>
            <button className="btn btn-red" onClick={() => deleteScheme(s.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
