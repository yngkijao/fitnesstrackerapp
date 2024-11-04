import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="pastel-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">FITNESS TRACKER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">HOME</Nav.Link>
            {user.id ? (
              <>
                <Nav.Link as={NavLink} to="/workouts" exact="true">WORKOUTS</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact="true">LOGOUT</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">LOGIN</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">REGISTER</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
