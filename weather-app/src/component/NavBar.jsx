import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = ({ brand, claim }) => {
  const location = useLocation();
  console.log("LOCATION", location);

  return (
    <Navbar
      expand="lg"
      className="bg-body-transparent border-bottom border-white"
      style={{ position: "stiky", top: 0, width: "100%" }}
    >
      <Container fluid="xl">
        <Navbar.Brand href="/" style={{ color: "white" }}>
          {brand} - {claim}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link text-white">
              Home
            </NavLink>
            <NavLink to="/five-day" className="nav-link text-white">
              Meteo per i prossimi 5 Giorni
            </NavLink>
            <NavLink to="/preferiti" className="nav-link text-white">
              Preferiti
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
