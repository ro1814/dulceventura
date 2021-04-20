import express from "express";
const router = express.Router();
import { getRecipes, getRecipeById } from "../controllers/recipeController.js";

router.route("/").get(getRecipes);

router.route("/:id").get(getRecipeById);

export default router;
