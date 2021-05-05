import express from "express";
const router = express.Router();
import { getRecipes, getRecipeById, deleteRecipe, createRecipe, updateRecipe, createRecipeReview, getTopRecipes } from "../controllers/recipeController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route("/").get(getRecipes).post(protect, admin, createRecipe)
router.route("/:id/reviews").post(protect, createRecipeReview)
router.get('/top', getTopRecipes)

router.route("/:id").get(getRecipeById).delete(protect, admin, deleteRecipe).put(protect, admin, updateRecipe)

export default router;
