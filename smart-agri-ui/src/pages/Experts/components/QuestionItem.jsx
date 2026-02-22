import React, { useState } from "react";

export default function QuestionItem({
  q,
  onAnswer,
  onDelete,
  onMarkAnswered,
  onMarkUnanswered,
  onMarkInProgress,
}) {
  const [answerText, setAnswerText] = useState("");

  const getStatusColor = (status) => {
    if (status === "PENDING") return "badge badge-orange";
    if (status === "IN_PROGRESS") return "badge badge-blue";
    if (status === "COMPLETED") return "badge badge-green";
    return "badge";
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h4>{q.question}</h4>
        <span className={getStatusColor(q.status)}>
          {q.status?.replace("_", " ")}
        </span>
      </div>

      <p className="muted">
        👨‍🌾 <strong>{q.farmerName}</strong> | 📂 {q.category || "General"}
      </p>

      {q.answer && (
        <div className="answer-box">
          <strong>✅ Expert Answer:</strong>
          <p>{q.answer}</p>
        </div>
      )}

      {/* Answer input */}
      <textarea
        placeholder="Write your answer..."
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />

      <div className="actions">
        <button
          className="btn btn-green"
          onClick={() => {
            onAnswer(q.id, answerText);
            setAnswerText("");
          }}
        >
          Submit Answer
        </button>

        <button className="btn btn-blue" onClick={() => onMarkInProgress(q.id)}>
          In Progress
        </button>

        <button className="btn btn-orange" onClick={() => onMarkUnanswered(q.id)}>
          Pending
        </button>

        <button className="btn btn-red" onClick={() => onDelete(q.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
