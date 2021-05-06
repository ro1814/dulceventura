import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updatetUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading ] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
      if(successUpdate){
          dispatch({ type: USER_UPDATE_RESET })
          history.push('/admin/userlist')
      } else {

        if(!user.name || user._id !== userId ){
            dispatch(getUserDetails(userId))
          } else {
              setName(user.name)
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
              setAvatar(user.avatar)
          }
      }
      
  }, [dispatch, history, userId, user, successUpdate]);

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
    dispatch(updatetUser({ _id: userId, name, email, isAdmin, avatar}))
  };


return (
  <>
    <Link to="/admin/userlist" className="btn btn-dark my-3" style={{ color: "#F55A00" }}>
      Regresa
    </Link>
    <FormContainer>
      <h1>Editar usuario</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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

          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Es administrador"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
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
            Actualizar
          </Button>
        </Form>
      )}
    </FormContainer>
    
  </>
)
}

export default UserEditScreen;
