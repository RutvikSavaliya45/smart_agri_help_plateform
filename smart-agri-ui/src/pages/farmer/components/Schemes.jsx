import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/schemes/all")
      .then(res => setSchemes(res.data));
  }, []);

  return (
    <section className="card card-pad">
      <h3>🌿 Government Schemes</h3>

      {schemes.map((s) => (
        <div key={s.id} className="scheme-card">
          <h4>{s.title}</h4>
          <p>{s.description}</p>

          {s.link && (
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green"
            >
              Apply Now
            </a>
          )}
        </div>
      ))}
    </section>
  );
}
