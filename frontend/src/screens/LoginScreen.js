import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
    
    <FormContainer>
      <h1>Dulceventura</h1>
      <p>By @Gustavomartincheff</p>
      <h2>Iniciar Sesión</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label><i className="far fa-envelope"></i> Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escriba su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label><i className="fas fa-lock"></i> Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Escriba su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className='btn btn-dark btn-block' style={{ color: '#F55A00'}}>
          Inicie sesión
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          ¿No tienes una cuenta? {' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          <i className="far fa-list-alt"></i> Regístrate aquí
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </>
  );
};

export default LoginScreen;
