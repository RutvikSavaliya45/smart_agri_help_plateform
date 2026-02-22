import React from "react";


export default function Sidebar({ active, setActive, handleLogout, open, setOpen }) {
  const menu = [
    { key: "home", label: "Dashboard" },
    { key: "expert", label: "Expert Help" },
    { key: "crop", label: "Crop Info" },
    { key: "check", label: "Weather" },
    { key: "rate", label: "Crop Rates" },
    { key: "scheme", label: "Schemes" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`farmer-sidebar ${open ? "open" : ""}`}>
        <h2 className="farmer-brand">🌱 Farmer Panel</h2>
        <div className="farmer-sub">Smart Agri Help</div>

        <nav className="farmer-nav">
          {menu.map((m) => (
            <button
              key={m.key}
              className={`farmer-link ${active === m.key ? "active" : ""}`}
              onClick={() => {
                setActive(m.key);
                setOpen(false); // mobile पर sidebar बंद हो जाएगा
              }}
            >
              {m.label}
            </button>
          ))}
        </nav>

        <button
          className="farmer-logout"
          onClick={() => {
            handleLogout();
            setOpen(false);
          }}
        >
          Logout
        </button>
      </aside>

      {/* Overlay */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>
      )}
    </>
  );
}
