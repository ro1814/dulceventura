import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Recipe from "../components/Recipe";
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listRecipes } from "../actions/recipeActions";
import RecipeTopRated from '../components/RecipeTopRated'

const HomeScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipes, page, pages } = recipeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
    dispatch(listRecipes(keyword, pageNumber));
    }
  }, [history, userInfo, dispatch, keyword, pageNumber]);

  return (
    <>
    {!keyword && <RecipeTopRated/>}
      <h1>Últimas recetas</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant = 'danger'>{error}</Message>
      ) : (
        <>
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <Recipe recipe={recipe} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}
        />
        </>
      )}
    </>
  );
};

export default HomeScreen;
