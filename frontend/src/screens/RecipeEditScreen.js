import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listRecipeDetails, updateRecipe } from "../actions/recipeActions";
import FormContainer from "../components/FormContainer";
import { RECIPE_UPDATE_RESET } from '../constants/recipeConstants'

const RecipeEditScreen = ({ match, history }) => {
  const recipeId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions ] = useState('');
  const [uploading, setUploading ] = useState(false);

  const dispatch = useDispatch();

  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { loading, error, recipe } = recipeDetails;

  const recipeUpdate = useSelector((state) => state.recipeUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = recipeUpdate;

  useEffect(() => {
    if(successUpdate){
      dispatch({ type: RECIPE_UPDATE_RESET })
      history.push('/admin/recipelist')

    } else {

      if(!recipe.name || recipe._id !== recipeId ){
        dispatch(listRecipeDetails(recipeId))
      } else {
          setName(recipe.name)
          setImage(recipe.image)
          setBackgroundImage(recipe.backgroundImage)
          setTime(recipe.time)
          setServings(recipe.servings)
          setIngredients(recipe.ingredients)
          setInstructions(recipe.instructions)
      }
    }    
  }, [dispatch, history, recipeId, recipe, successUpdate]);

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

      setImage(data)
      setUploading(false)
      
    } catch (error) {
      console.error(error)
      setUploading(false)
    }  
  }

  const uploadBackgroungImageHandler = async(e) =>{
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

      setBackgroundImage(data)
      setUploading(false)
      
    } catch (error) {
      console.error(error)
      setUploading(false)
    }  
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateRecipe({
      _id: recipeId,
      name,
      time,
      servings,
      image,
      backgroundImage,
      ingredients,
      instructions
    }))
  };


return (
  <>
    <Link to="/admin/recipelist" className="btn btn-light my-3">
      Regresa
    </Link>
    <FormContainer>
      <h1>Editar receta</h1>
      { loadingUpdate && <Loader /> }
      {errorUpdate && <Message variant = 'danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="name"
              placeholder="Escriba el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>Tiempo:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escriba el tiempo"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="servings">
            <Form.Label>Raciones:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Raciones/porciones"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Foto de la receta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Foto de la receta"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File id='image-file' label='Escoge la imagen' custom onChange={uploadFileHandler}> 
            </Form.File>
            {uploading && <Loader/>}
          </Form.Group>

          <Form.Group controlId="backgroundImage">
            <Form.Label>Foto de fondo de la receta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Foto de fondo de la receta"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
            ></Form.Control>
            <Form.File id='backgroundImage-file' label='Escoge la imagen de fondo' custom onChange={uploadBackgroungImageHandler}> 
            </Form.File>
            {uploading && <Loader/>}
          </Form.Group>

          <Form.Group controlId="ingredients">
            <Form.Label>Ingredientes:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingredientes"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="instructions">
            <Form.Label>Preparación:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Preparación de la receta"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Actualizar receta
          </Button>
        </Form>
      )}
    </FormContainer>
    
  </>
)
}

export default RecipeEditScreen;
