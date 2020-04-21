import React, { useEffect } from "react";
import "./styles.scss";
import IngredientGraph from "./IngredientGraph";
import Button from "./Button";
import CoolCarousel from "./CoolCarousel";
import { Link } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";

function Ingredient({ match }) {
  const { state, getNutrients, fetchRecipes } = useApplicationData();

  // upon ingredient search query, display nutritional information and related recipes
  useEffect(() => {
    const format = match.url.split("/");
    getNutrients(format[2]);
    fetchRecipes(format[3]);
  }, []);

  return (
    <>
      <div className="ingredient-page">
        <h1 className="favourite-title">Ingredient Profile</h1>
        <div className="button-and-graph-container">
          <div className="button-container">
            <Link to={"/"} className="position-right">
              <Button default>Start Over</Button>
            </Link>
          </div>
          <IngredientGraph data={state.search} />
        </div>
        <div class="carousel">
          <h2>Featured Recipes</h2>
          {state.recipes && (
            <CoolCarousel className="carousel" recipes={state.recipes} />
          )}
        </div>
      </div>
    </>
  );
}
export default Ingredient;
