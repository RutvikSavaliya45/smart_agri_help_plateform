import { Card, Button } from 'react-bootstrap';

export default function HomeCard() {
  return (
    <Card className="shadow mb-3" style={{ borderRadius: '8px' }}>
      <Card.Body>
        <Card.Title style={{ color: "#2a7d2a" }}>Welcome to Smart Agri Help</Card.Title>
        <Card.Text style={{ color: "#333" }}>
          Get Crop Guidance, Complaint Management, Expert Help, Weather Alerts and Govt Schemes.
        </Card.Text>
        <Button 
          style={{ backgroundColor: "#2a7d2a", border: 'none' }} 
          href="/complaints"
        >
          View Complaints
        </Button>
      </Card.Body>
    </Card>
  );
}
