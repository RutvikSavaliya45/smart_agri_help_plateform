import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./ComplaintManagement.css";

const ComplaintManagement = () => {
  // Dummy data (later API से आएगा)
  const [complaints, setComplaints] = useState([
    { id: 1, farmer: "Ramesh", complaint: "Water supply issue", status: "Pending" },
    { id: 2, farmer: "Suresh", complaint: "Pesticide guidance needed", status: "In Progress" },
    { id: 3, farmer: "Mahesh", complaint: "Seed quality issue", status: "Resolved" },
  ]);

  // Status update function
  const updateStatus = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  return (
    <div className="complaints-container p-4">
      <h2 className="mb-4 text-success">📢 Complaint Management</h2>
      <Table striped bordered hover responsive>
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Farmer</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.farmer}</td>
              <td>{c.complaint}</td>
              <td>
                <Badge
                  bg={
                    c.status === "Pending"
                      ? "warning"
                      : c.status === "In Progress"
                      ? "info"
                      : "success"
                  }
                >
                  {c.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => updateStatus(c.id, "Pending")}
                  className="me-1"
                >
                  Pending
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => updateStatus(c.id, "In Progress")}
                  className="me-1"
                >
                  In Progress
                </Button>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => updateStatus(c.id, "Resolved")}
                >
                  Resolved
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ComplaintManagement;
