import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";


const RecipeScreen = ({ match }) => {
  const [recipe, setRecipe ] = useState({})

  useEffect(() =>{
    const fetchRecipe = async () => {
        const { data } = await axios.get(`/api/recipes/${match.params.id}`)

        setRecipe(data)
    }

    fetchRecipe()
},[ match ])

  return (
    <>
      <Link className="btn btn-dark my-3" to="/" style={{color: "#F55A00"}}>
        Regresa
      </Link>
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
              <Button className='btn btn-dark btn-block' type='button' style={{color: "#F55A00"}}>
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
    </>
  );
};

export default RecipeScreen;
