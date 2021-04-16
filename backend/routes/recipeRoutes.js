import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Recipe from '../models/recipeModel.js'

// @desc Fetch all recipes
// @route GET /api/recipes
// @access Public

router.get('/', asyncHandler (async (req, res) => {
    const recipes = await Recipe.find({})

    res.json(recipes)
}))


// @desc Fetch single recipe
// @route GET /api/recipes/:id
// @access Public

router.get('/:id', asyncHandler ( async (req, res) => {
    const recipe = await Recipe .findById(req.params.id)

    if (recipe) {
        res.json(recipe)
    } else {

        res.status(404)
        throw new Error('Receta no encontrada')
    }

    
}))

export default router