import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToFav, removeFromFav } from "../actions/favActions";

const FavScreen = ({ match, history }) => {
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
  }

  return (
    <Row>
      <Col md={8}>
          <h1>Favoritos</h1>
          {favItems.length === 0 ? (<Message> <strong> Tu lista de favoritos está vacía.</strong> <Link to ='/'>Regresa </Link> </Message>) : (
              <ListGroup variant = 'flush'>{favItems.map(item=> (
                  <ListGroup.Item key={item.recipe}>
                      <Row>

                          <Col md = {2}>
                              <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>

                          <Col md ={8}>
                              <Link to={`/recipe/${item.recipe}`}><h2>{item.name}</h2></Link>
                          </Col>

                          <Col md= {2}>
                              <Button type='button' variant='light' onClick={() => removeFromFavHandler(item.recipe)}><i className='fas fa-trash'></i></Button>
                          </Col>

                      </Row>
                  </ListGroup.Item>
              ))}</ListGroup>
          )}
      </Col>
    </Row>
  );
};

export default FavScreen;
