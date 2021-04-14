import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Recipe from '../components/Recipe'

const HomeScreen = () => {
    const [ recipes, setRecipes ] = useState([])

    useEffect(() =>{
        const fetchRecipes = async() => {
            const {data} = await axios.get('/api/recipes')

            setRecipes(data)
        }

        fetchRecipes()
    }, [])

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
