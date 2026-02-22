import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data (later backend से आएगा)
  const complaints = [
    { id: 1, farmer: "Ramesh", complaint: "Water supply issue", status: "Pending", date: "25-08-2025" },
    { id: 2, farmer: "Suresh", complaint: "Pesticide guidance needed", status: "In Progress", date: "24-08-2025" },
    { id: 3, farmer: "Mahesh", complaint: "Seed quality issue", status: "Resolved", date: "20-08-2025" },
  ];

  const complaint = complaints.find((c) => c.id === parseInt(id));

  if (!complaint) {
    return <h3 className="text-danger p-4">❌ Complaint Not Found</h3>;
  }

  return (
    <div className="p-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="text-success">Complaint #{complaint.id}</Card.Title>
          <p><strong>Farmer:</strong> {complaint.farmer}</p>
          <p><strong>Complaint:</strong> {complaint.complaint}</p>
          <p><strong>Date:</strong> {complaint.date}</p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge bg={
              complaint.status === "Pending"
                ? "warning"
                : complaint.status === "In Progress"
                ? "info"
                : "success"
            }>
              {complaint.status}
            </Badge>
          </p>
          <Button variant="secondary" onClick={() => navigate("/admin/complaints")}>
            ⬅ Back to Complaints
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ComplaintDetails;
