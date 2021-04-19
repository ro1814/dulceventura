import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { listRecipeDetails } from "../actions/recipeActions";
import Loader from '../components/Loader'
import Message from '../components/Message'

const RecipeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { loading, error, recipe } = recipeDetails;

  useEffect(() => {
    dispatch(listRecipeDetails(match.params.id));
  }, [dispatch, match]);

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
      )}
    </>
  );
};

export default RecipeScreen;
