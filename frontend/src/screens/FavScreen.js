import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
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
    if (!userInfo || !userLogin) {
      history.push('/login')
    } else {
    if (recipeId) {
      dispatch(addToFav(recipeId));
    }}
  }, [dispatch, recipeId, history, userInfo, userLogin]);

  const removeFromFavHandler = (id) => {
    dispatch(removeFromFav(id));
  };

  return (
    <>
      <Row >
      
        <Col className='header-login__gradient--down'>
          <h1>Favoritos</h1>
          <h2>¡Hola!</h2>
          <h2>Aquí tienes tu espacio de recetas</h2>
          {favItems.length === 0 ? (
            <Message>
              {" "}
              <strong>
                {" "}
                Tu lista de favoritos está vacía.{" "}
                <Link to="/" style={{ color: "black" }}>
                  {" "}
                  Regresa{" "}
                </Link>{" "}
              </strong>
            </Message>
          ) : (
            <>
              <Card variant="flush" className='overlay-div'>
                {favItems.map((item) => (
                  <Card.Body key={item.recipe}>
                    <Card.Title>
                      <Link to={`/recipe/${item.recipe}`}>
                        <h1 style={{ color: "#F55A00" }}>{item.name}</h1>
                      </Link>
                    </Card.Title>
                    <Card.Text as="div">
                    <Row>
                      <Col xs={6} md={4}>
                      <Image xs={6} md={4}
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className="favImage"
                      />
                      </Col>
                      <Col xs={6} md={4}>
                      <Button
                        type="button"
                        variant="dark"
                        className="btn btn-dark my-3"
                        style={{ color: "#F55A00" }}
                        onClick={() => removeFromFavHandler(item.recipe)}
                      >
                        Remover <i className="fas fa-trash"></i>
                      </Button></Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                ))}
              </Card>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FavScreen;
