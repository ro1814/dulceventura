import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import Message from "../components/Message";
import { addToFav, removeFromFav } from "../actions/favActions";

const FavScreen = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeId = match.params.id;

  const dispatch = useDispatch();

  const fav = useSelector((state) => state.fav);
  const { favItems } = fav;

  useEffect(() => {
    if (recipeId) {
      dispatch(addToFav(recipeId));
    }
  }, [dispatch, recipeId]);

  const removeFromFavHandler = (id) => {
    dispatch(removeFromFav(id));
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Favoritos</h1>
          <h2>¡Hola, {userInfo.name}!</h2>
          <h2>Aquí tienes tu espacio de recetas</h2>
          {favItems.length === 0 ? (
            <Message>
              {" "}
              <strong>
                {" "}
                Tu lista de favoritos está vacía.{" "}
                <Link to="/" style={{ color: "F55A00" }}>
                  {" "}
                  Regresa{" "}
                </Link>{" "}
              </strong>
            </Message>
          ) : (
            <>
              <ListGroup variant="flush">
                {favItems.map((item) => (
                  <ListGroup.Item key={item.recipe}>
                    <Row className="justify-content-md-center">
                      <Col xs lg="2">
                        <Link to={`/recipe/${item.recipe}`}>
                          <h1 style={{ color: "#F55A00" }}>{item.name}</h1>
                        </Link>
                      </Col>

                      <Col>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          className="favImage"
                        />
                      </Col>

                      <Col xs lg="2">
                        <Button
                          type="button"
                          variant="dark"
                          className="btn btn-dark my-3"
                          style={{ color: "#F55A00" }}
                          onClick={() => removeFromFavHandler(item.recipe)}
                        >
                          Remover <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FavScreen;
