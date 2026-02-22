import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#0c8743" }} variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">Smart Agri Help</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/complaints" className="text-white">Complaints</Nav.Link>
            <Nav.Link href="/schemes" className="text-white">Schemes</Nav.Link>
            <Nav.Link href="/login" className="text-white">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
