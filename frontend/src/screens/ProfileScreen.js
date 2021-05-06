import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading ] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user || !user.name || success ) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
        } else {
            setName(user.name)
            setEmail(user.email)
            setAvatar(user.avatar)
        } 
    }
  }, [dispatch, history, userInfo, user, success]);

  const uploadFileHandler = async(e) =>{
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)

    try {
      const config = { 
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setAvatar(data)
      setUploading(false)
      
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Contraseñas no coinciden')
    } else {
   dispatch(updateUserProfile({ id: user._id, name, email, password, avatar }))
  }}

  return (
    <Row>
        <Col className='header-login__gradient--up'>
      <h2>Perfil</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Perfil actualizado</Message>}
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
              placeholder="Foto de perfil"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            ></Form.Control>
            <Form.File id='avatar-file' label='Escoge la foto' custom onChange={uploadFileHandler}> 
            </Form.File>
            {uploading && <Loader/>}
          </Form.Group>

        <Button type="submit" variant="primary" className="btn btn-dark my-3 btn-block" style={{ color: "#F55A00" }}>
          Actualizar perfil
        </Button>
      </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
