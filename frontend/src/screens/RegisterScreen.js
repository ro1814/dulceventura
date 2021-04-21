import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Contraseñas no coinciden')
    } else {
    dispatch(register(name, email, password, avatar))
  }}

  return (
    <FormContainer>
      <h1>Regístrese aquí</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>

      <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="name"
            placeholder="Escriba su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escriba su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Escriba su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirme su contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme su contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="avatar">
          <Form.Label>Foto de perfil</Form.Label>
          <Form.Control
            type="text"
            placeholder="Foto de Perfil"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Rigistar
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Ya estás registrado?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Inicia sesión aquí
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
