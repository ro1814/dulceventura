import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><i className='fas fa-home'></i></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />}/>
            <Nav className="ml-auto">
              <LinkContainer to="/fav">
                <Nav.Link>
                  <i className="far fa-star"></i> Favoritos
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/recipes">
                <Nav.Link>
                  <i className="far fa-list-alt"></i> Recetas
                </Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/contact">
                <Nav.Link>
                  <i className="far fa-address-book"></i> Contacto
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
  
                <NavDropdown title={<div><Image src={userInfo.avatar} fluid roundedCircle width={40} height={40}/></div>} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="far fa-user"></i> Iniciar Sesión
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (

                <NavDropdown title='Admin' id="adminmenu">

                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Usuarios</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/recipelist">
                  <NavDropdown.Item>Recetas</NavDropdown.Item>
                </LinkContainer>
                
              </NavDropdown>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
