import React, { useState, useEffect } from "react";
import "./styles.scss";
import IngredientGraph from "./IngredientGraph";
import CoolCarousel from "./CoolCarousel";
import useApplicationData from "../hooks/useApplicationData";

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

function Ingredient({ match }) {
  const {
    state,
    getNutrients,
    fetchRecipes,
    fetchUsers,
  } = useApplicationData();

  // upon ingredient search query, display nutritional information and related recipes
  useEffect(() => {
    const format = match.url.split("/");
    getNutrients(format[2]);
    fetchRecipes(format[3]);
    fetchUsers();
  }, []);

  return (
    <>
      <IngredientGraph data={state.search} />
      {state.recipes && <CoolCarousel recipes={state.recipes} />}
      {state.users && <CoolCarousel recipes={state.users} />}
    </>
  );
}
export default Ingredient;
