import React, { useEffect, useState } from "react";
import "./ProfilePanel.css";

const API_URL = "http://localhost:8080/api/farmer/profile";

export default function ProfilePanel() {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const farmerId = localStorage.getItem("farmerId") || "F-1024";

    fetch(`${API_URL}/${farmerId}`)
      .then((res) => res.json())
      .then((data) => {
        setFarmer(data);
        setLoading(false);
      })
      .catch(() => {
        // fallback if backend fails
        setFarmer({
          id: farmerId,
          name: localStorage.getItem("farmerName") || "Ramesh Kumar",
          region: localStorage.getItem("farmerRegion") || "Rajkot" ,
          land: "2.5 acres",
          phone: "+91-98765-43210",
          email: "ramesh@example.com",
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="profile-card">
        <p className="text-muted">Loading profile...</p>
      </div>
    );
  }

  const initials = farmer.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="profile-card">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>

        <div className="profile-main">
          <h4 className="profile-name">{farmer.name}</h4>
          <p className="profile-sub">
            {farmer.id} • {farmer.region}
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div className="profile-details">
        <div>
          <span>🌱 Land</span>
          <strong>{farmer.land}</strong>
        </div>
        <div>
          <span>📞 Phone</span>
          <strong>{farmer.phone}</strong>
        </div>
        <div>
          <span>✉️ Email</span>
          <strong>{farmer.email}</strong>
        </div>
      </div>

      {/* Actions */}
      <div className="profile-actions">
        <button
          className="btn btn-green"
          onClick={() => alert("Edit profile coming soon")}
        >
          ✏️ Edit Profile
        </button>
        <button
          className="btn btn-outline"
          onClick={() => alert("View full profile")}
        >
          👁 View
        </button>
      </div>
    </div>
  );
}
