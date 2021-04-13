import React from 'react'
import { Card } from 'react-bootstrap'

const Recipe = ({ recipe }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/recipe/${recipe._id}`}>
                <Card.Img src= {recipe.image} variant='top' />
            </a>
            <Card.Body>
            <a href={`/recipe/${recipe._id}`}>
                <Card.Title as='div'> <strong>Receta: {recipe.name}</strong></Card.Title>
            </a>
            <Card.Text as='div'>
            <div className='my-3'>
            Puntuación: {recipe.rating} de {recipe.numReviews} Comentarios.
            </div>
            </Card.Text>
            
            </Card.Body>
        </Card>
    )
}

export default Recipe
