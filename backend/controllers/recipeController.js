import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc Fetch all recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler(async (req, res) => {

  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Recipe.countDocuments({ ...keyword })
  const recipes = await Recipe.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

  res.json({ recipes, page, pages: Math.ceil(count/pageSize) });
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
    name: "Receta ejemplo",
    user: req.user._id,
    image: "/images/sample.jpg",
    backgroundImage: "/images/sample.jpg",
    time: 0,
    servings: 0,
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
    recipe.name = name;
    recipe.image = image;
    recipe.backgroundImage = backgroundImage;
    recipe.servings = servings;
    recipe.time = time;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error("Receta no encontrada.");
  }
});

// @desc Create new review
// @route POST /api/recipes/:id/reviews
// @access Private

const createRecipeReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    const alreadyReviewed = recipe.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Receta ya valorada o comentada");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    recipe.reviews.push(review);

    recipe.numReviews = recipe.reviews.length;

    recipe.rating =
      recipe.reviews.reduce((acc, item) => item.rating + acc, 0) /
      recipe.reviews.length;

    await recipe.save();

    res.status(201).json({ message: "Comentario agregado." });
  } else {
    res.status(404);
    throw new Error("Receta no encontrada.");
  }
});

// @desc Get top rated recipes
// @route POST /api/recipes/:id/top
// @access Public

const getTopRecipes = asyncHandler(async (req, res) => {

  const recipes = await Recipe.find({}).sort({ rating: -1 }).limit(3)

  res.json(recipes) 
});

export {
  getRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  createRecipeReview,
  getTopRecipes
};
