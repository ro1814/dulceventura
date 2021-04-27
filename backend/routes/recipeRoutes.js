import express from "express";
const router = express.Router();
import { getRecipes, getRecipeById, deleteRecipe, createRecipe, updateRecipe } from "../controllers/recipeController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route("/").get(getRecipes).post(protect, admin, createRecipe)

router.route("/:id").get(getRecipeById).delete(protect, admin, deleteRecipe).put(protect, admin, updateRecipe)

export default router;
