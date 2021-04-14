import React from 'react'
import { Row, Col } from 'react-bootstrap'
import  recipes from '../recipes'
import Recipe from '../components/Recipe'

const HomeScreen = () => {
    return (
        <>
            <h1>Últimas recetas</h1>
            <Row>
                {recipes.map((recipe) => (
                    <Col key={recipe._id}sm={12} md={6} lg={4} xl={3}>
                        <Recipe recipe={recipe}/>
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default HomeScreen
