import React from "react";

export default function Home({ complaints = [], users = [] }) {
  const totalComplaints = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const totalUsers = users.length;
  const farmers = users.filter(u => u.role === "farmer").length;
  const experts = users.filter(u => u.role === "expert").length;

  return (
    <div className="admin-home-grid">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-num">{totalComplaints}</div>
          <div className="stat-label">Total Complaints</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      <div className="card card-pad">
        <h3>Quick Overview</h3>
        <p className="text-muted">Users: {totalUsers} • Farmers: {farmers} • Experts: {experts}</p>
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-green" onClick={() => alert("Open complaints")}>View Complaints</button>
        </div>
      </div>
    </div>
  );
}
