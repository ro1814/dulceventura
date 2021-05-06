import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
const Footer = () => {
  return (
      <>
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 footerText">
            
            <Nav.Link target='_blank' href="https://www.instagram.com/gustavomartincheff/">Copyright &copy; Dulceventura{" "}<i className="fab fa-instagram"></i></Nav.Link>
            
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  );
};

export default Footer;
