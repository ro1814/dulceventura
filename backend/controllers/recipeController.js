import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc Fetch all recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});

  res.json(recipes);
});

// @desc Fetch single recipe
// @route GET /api/recipes/:id
// @access Public

const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error("Receta no encontrada");
  }
});

// @desc Delete a recipe
// @route DELETE /api/recipes/:id
// @access Private/Admin

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    await recipe.remove();
    res.json({ message: "Receta eliminada" });
  } else {
    res.status(404);
    throw new Error("Receta no encontrada");
  }
});

// @desc Create a recipe
// @route POST /api/recipes
// @access Private/Admin

const createRecipe = asyncHandler(async (req, res) => {
  const recipe = new Recipe({
    name: "Sample Recipe",
    user: req.user._id,
    image: "/images/sample.jpg",
    backgroundImage: "/images/sample.jpg",
    time: 10,
    servings: 5,
    ingredients: "ejemplo",
    instructions: "ejemplo",
    numReviews: 0,
  });

  const createdRecipe = await recipe.save();
  res.status(201).json(createdRecipe);
});

// @desc Update a recipe
// @route PUT /api/recipes/:id
// @access Private/Admin

const updateRecipe = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    backgroundImage,
    time,
    servings,
    ingredients,
    instructions,
  } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.name = name
    recipe.image = image
    recipe.backgroundImage = backgroundImage
    recipe.servings = servings
    recipe.time = time
    recipe.ingredients = ingredients
    recipe.instructions = instructions

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe)
  } else {
    res.status(404);
    throw new Error("Receta no encontrada.");
  }
});

export { getRecipes, getRecipeById, deleteRecipe, createRecipe, updateRecipe };
