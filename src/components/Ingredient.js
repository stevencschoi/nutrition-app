import React, { useEffect } from "react";
import "./styles.scss";
import IngredientGraph from "./IngredientGraph";
import Button from "./Button";
import CoolCarousel from "./CoolCarousel";
import { Link } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";

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
    <div id="ingredient-page">
      <IngredientGraph data={state.search} />
      <Link to={"/"}>
        <Button default>Start Over</Button>
      </Link>
      <div id="carousel">
        <h2>Featured Recipes</h2>
        {state.recipes && <CoolCarousel recipes={state.recipes} />}
      </div>
    </div>
  );
}
export default Ingredient;
