import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { listTopRecipes } from "../actions/recipeActions";

const RecipeTopRated = () => {
  const dispatch = useDispatch();

  const recipeTopRated = useSelector((state) => state.recipeTopRated);
  const { loading, error, recipes } = recipeTopRated;

  useEffect(() => {
    dispatch(listTopRecipes());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Top 3 de recetas más populares</h1>
      <Carousel fade pause="hover" className="bg-dark">
        {recipes.map((recipe) => (
          <Carousel.Item key={recipe._id} interval={2000}>
            <Link to={`/recipe/${recipe._id}`}>
              <Image src={recipe.image} alt={recipe.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {recipe.name}{" "}
                  <Rating
                    value={recipe.rating}
                    text={`${recipe.numReviews} comentarios`}
                  />
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default RecipeTopRated;
