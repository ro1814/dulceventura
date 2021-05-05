import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listRecipeDetails,
  createRecipeReview,
} from "../actions/recipeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { RECIPE_CREATE_REVIEW_RESET } from "../constants/recipeConstants";

const RecipeScreen = ({ history, match }) => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { loading, error, recipe } = recipeDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeReviewCreate = useSelector((state) => state.recipeReviewCreate)
  const {
    success: successRecipeReview,
    loading: loadingRecipeReview,
    error: errorRecipeReview,
  } = recipeReviewCreate

  useEffect(() => {
    if (successRecipeReview) {
      setRating(0)
      setComment('')
    }
    if (!recipe._id || recipe._id !== match.params.id) {
      dispatch(listRecipeDetails(match.params.id))
      dispatch({ type: RECIPE_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successRecipeReview, recipe])

  const addToFavHandler = () => {
    history.push(`/fav/${match.params.id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createRecipeReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to="/" style={{ color: "#F55A00" }}>
        Regresa
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <Image src={recipe.image} alt={recipe.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{recipe.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <i className="fas fa-chart-pie"></i> Porciones:
                    {recipe.servings}.
                  </div>
                  <div>
                    <i className="far fa-clock"></i> Duración: {recipe.time}.
                  </div>
                  <Rating
                    value={recipe.rating}
                    text={`${recipe.numReviews} comentarios`}
                  />
                  <div>
                    <Button
                      onClick={addToFavHandler}
                      className="btn btn-dark btn-block"
                      type="button"
                      style={{ color: "#F55A00" }}
                    >
                      Agregar a favoritos
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Ingredientes:</h4>
                  <p>{recipe.ingredients}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Preparación:</h4>
                  <p>{recipe.instructions}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Comentarios:</h2>
              {recipe.reviews.length === 0 && (
                <Message>Sin comentarios.</Message>
              )}
              <ListGroup variant="flush">
                {recipe.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Escribe tu comentario:</h2>
                  {successRecipeReview && (
                    <Message variant='success'>
                      ¡Comentario agregado con éxito!
                    </Message>
                  )}
                  {loadingRecipeReview && <Loader />}
                  {errorRecipeReview && (
                    <Message variant='danger'>{errorRecipeReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Puntuación:</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Seleccione...</option>
                          <option value="1">1 - Malo </option>
                          <option value="2">2 - Regular </option>
                          <option value="3">3 - Bueno </option>
                          <option value="4">4 - Muy bueno </option>
                          <option value="5">5 - Excelente </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Comentar
                      </Button>

                    </Form>
                  ) : (
                    <Message>
                      Por favor, <Link to="/login">Incie sesión</Link> para
                      poder dejar un comentario.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          
        </>
      )}
  
    </>
  );
};

export default RecipeScreen;
