import React, { useEffect } from "react";
import "./styles.scss";
import IngredientGraph from "./IngredientGraph";
import Button from "./Button";
import CoolCarousel from "./CoolCarousel";
import { Link } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";

function Ingredient({ match }) {
  
  const { state, getNutrients, fetchRecipes } = useApplicationData();

  // retrieve object stored in local storage which contains dietary options and restrictions
  const healthLabels = JSON.parse(localStorage.getItem('healthObj'));
  
  // format variable to plug into diet label for axios recipe request
  let diet;
  if (healthLabels.diet.join() === "") {
    diet = "";
  } else {
    diet = `&diet=${healthLabels.diet.join().replace(',', '&')}`;
  };

  // format variable to plug into health label for axios recipe request
  let health;
  if (healthLabels.restrictions.join() === "") {
    health = "&";
  } else {
    health = `&health=${healthLabels.restrictions.join().replace(',', '&')}&`;
  };

  // upon ingredient search query, display nutritional information and related recipes
  useEffect(() => {
    const format = match.url.split("/");
    getNutrients(format[2]);
    fetchRecipes(format[3], diet, health);
  }, []);

  const clearLocalStorage = () => localStorage.removeItem('healthObj');

  return (
    <>
      <div className="ingredient-page">
        <h1 className="favourite-title">Ingredient Profile</h1>
        <div className="button-container">
          <Link to={"/"} className="position-right">
            <Button 
              default
              onClick={clearLocalStorage}
            >
              Start Over
            </Button>
          </Link>
        </div>
        <IngredientGraph data={state.search} />
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
