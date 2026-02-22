import { Card, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Card className="shadow p-4 mb-3">
      <Card.Body>
        <Card.Title>Welcome to Smart Agri Help</Card.Title>
        <Card.Text>
          Get Crop Guidance, Complaint Management, Expert Help, Weather Alerts and Govt Schemes.
        </Card.Text>
        <Button variant="primary" href="/complaints">View Complaints</Button>
      </Card.Body>
    </Card>
  );
}
