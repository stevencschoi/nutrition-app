import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipeCarousel from "./RecipeCarousel";
import IngredientGraph from "./IngredientGraph";
import CoolCarousel from "./CoolCarousel";
import useApplicationData from "../hooks/useApplicationData";

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

function Ingredient({ match }) {
  const { state, getNutrients, fetchRecipes } = useApplicationData();

  useEffect(() => {
    const format = match.url.split("/");
    getNutrients(format[2]);
    fetchRecipes(format[3]);
  }, []);

  return (
    <>
      <IngredientGraph data={state.search} />
      {state.recipes && <CoolCarousel recipes={state.recipes} />}
    </>
  );
}
export default Ingredient;
