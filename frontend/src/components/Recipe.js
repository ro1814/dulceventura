import React from 'react'
import {Link} from 'react-router-dom'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
 
const Recipe = ({ recipe }) => {
    return (
        <Card className='my-3 p-3 rounded overlay-div header-login__gradient--down'>
            <Link to={`/recipe/${recipe._id}`}>
                <Card.Img src= {recipe.image} variant='top' />
            </Link>
            <Card.Body>
            <Link to={`/recipe/${recipe._id}`}>
                <Card.Title as='div'> <strong>Receta: {recipe.name}</strong></Card.Title>
            </Link>
            <Card.Text as='div'>
            <Rating value = {recipe.rating} text = {` ${recipe.numReviews} comentarios`}/>
            </Card.Text>
            <Card.Text as='div'>
            <div>
            <i className="fas fa-chart-pie"></i> Porciones: {recipe.servings}.
            </div>
            </Card.Text>
            <Card.Text as='div'>
                <div>
            <i className="far fa-clock"></i> Duración: {recipe.time} minutos aprox.
            </div>
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Recipe
