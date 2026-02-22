import React from "react";

export default function StatsCards({ questions }) {
  const total = questions.length;
  const pending = questions.filter((q) => !q.answered).length;
  const answered = questions.filter((q) => q.answered).length;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-num">{total}</div>
        <div className="stat-label">Total Questions</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{pending}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{answered}</div>
        <div className="stat-label">Answered</div>
      </div>
    </div>
  );
}
