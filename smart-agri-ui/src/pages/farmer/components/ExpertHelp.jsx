import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpertHelp() {
  const [question, setQuestion] = useState("");
  const [qaList, setQaList] = useState([]);

  // 👇 logged in farmer name
  const farmerName = localStorage.getItem("farmerName");

  // fetch only this farmer questions
  useEffect(() => {
    if (farmerName) {
      axios
        .get(`http://localhost:8080/api/expert/farmer/${farmerName}`)
        .then(res => setQaList(res.data));
    }
  }, [farmerName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    await axios.post("http://localhost:8080/api/expert/ask", {
      farmerName: farmerName,
      question: question
    });

    setQuestion("");

    // 👇 refresh only this farmer data
    const res = await axios.get(
      `http://localhost:8080/api/expert/farmer/${farmerName}`
    );
    setQaList(res.data);
  };

  return (
    <section className="card card-pad">
      <h3>👨‍🌾 Expert Help</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          placeholder="તમારો સવાલ અહીં લખો..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="btn btn-green w-100">Ask Expert</button>
      </form>

      <hr />

      {qaList.map(q => (
        <div key={q.id} className="qa-card">
          <p><b>❓ Question:</b> {q.question}</p>
          <p><b>✅ Answer:</b> {q.answer}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`status ${q.status.toLowerCase()}`}>
              {q.status}
            </span>
          </p>
        </div>
      ))}
    </section>
  );
}

export default ExpertHelp;