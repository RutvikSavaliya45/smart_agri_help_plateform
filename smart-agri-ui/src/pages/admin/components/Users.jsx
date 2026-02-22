import React, { useEffect, useState } from "react";

const API = "http://localhost:8080/api/admin/users";

export default function AdminManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`${API}/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(updated => {
      setUsers(prev => prev.map(u => u.id === id ? updated : u));
    });
  };

  const deleteUser = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
  };

  return (
    <div className="card card-pad">
      <h3>Manage Users</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>

              <td>
                <button onClick={() => updateStatus(u.id,"BLOCKED")}>
                  Block
                </button>

                <button onClick={() => updateStatus(u.id,"ACTIVE")}>
                  Unblock
                </button>

                <button onClick={() => deleteUser(u.id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
