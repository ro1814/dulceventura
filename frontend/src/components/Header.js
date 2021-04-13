import React from "react";
import {
  Navbar,
  Nav,
  Container
} from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
        <Navbar.Brand href="/">Dulceventura</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/likes"> <i className='far fa-star'></i> Favoritos</Nav.Link>
            <Nav.Link href="/recipes"> <i className='far fa-list-alt'></i> Recetas</Nav.Link>
            <Nav.Link href="/login"> <i className='far fa-user'></i> Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
