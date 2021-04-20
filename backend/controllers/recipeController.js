import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'


// @desc Fetch all recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler( async( req, res ) => {
    const recipes = await Recipe.find({})

    res.json(recipes)
})

// @desc Fetch single recipe
// @route GET /api/recipes/:id
// @access Public

const getRecipeById = asyncHandler( async( req, res ) => {
    const recipe = await Recipe .findById(req.params.id)

    if (recipe) {
        res.json(recipe)
    } else {

        res.status(404)
        throw new Error('Receta no encontrada')
    }
})

export {
    getRecipes,
    getRecipeById
}