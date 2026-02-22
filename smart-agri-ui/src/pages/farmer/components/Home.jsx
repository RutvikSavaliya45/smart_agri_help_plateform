import React from "react";
import ProfilePanel from "./ProfilePanel";

export default function Home({ complaints, cropSummary, weatherMini, onOpenCropRates }) {
  // cropSummary: optional array [{crop, avg}] or you can compute inside
  const totalComplaints = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="home-grid">
      {/* Left / Main column */}
      <div className="home-main">
        {/* Stat Cards */}
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

        {/* Quick Actions / Widgets */}
        <div className="widgets-row">
          <div className="widget card">
            <h4>🌦️ Weather</h4>
            {weatherMini ? (
              <div className="weather-mini">
                <div className="wm-city">{weatherMini.name}</div>
                <div className="wm-temp">{Math.round(weatherMini.temp)}°C</div>
                <div className="wm-desc">{weatherMini.desc}</div>
              </div>
            ) : (
              <div className="text-muted">No weather</div>
            )}
          </div>

          <div className="widget card">
            <h4>🌾 Crop Rates (Summary)</h4>
            {cropSummary && cropSummary.length ? (
              <ul className="mini-list">
                {cropSummary.slice(0,4).map((c, i) => (
                  <li key={i}>
                    <strong>{c.crop}</strong> — ₹{c.avg}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No data</div>
            )}
            <div style={{marginTop:10}}>
              <button className="btn btn-green" onClick={onOpenCropRates}>View Rates</button>
            </div>
          </div>

          <div className="widget card">
            <h4>📢 Quick Links</h4>
            <div className="quick-links">
              <button className="btn" onClick={() => alert('Open Schemes tab')}>Schemes</button>
              <button className="btn" onClick={() => alert('Open Expert Help')}>Ask Expert</button>
              <button className="btn" onClick={() => alert('Open File Complaint')}>File Complaint</button>
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="card card-pad">
          <h3>Recent Complaints</h3>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.slice(0,6).map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.issue}</td>
                    <td><span className={
                      c.status === "Pending" ? "badge badge-pending" :
                      c.status === "In Progress" ? "badge badge-progress" : "badge badge-resolved"
                    }>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right column: Profile Panel */}
      <aside className="home-side">
        <ProfilePanel />
        {/* small extra card */}
        <div className="card card-pad" style={{marginTop:12}}>
          <h4>Notifications</h4>
          <p className="text-muted">You have {pending} pending complaints.</p>
        </div>
      </aside>
    </div>
  );
}
