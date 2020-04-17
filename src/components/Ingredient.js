import React, { useEffect } from "react";
import "./styles.scss";
import IngredientGraph from "./IngredientGraph";
import CoolCarousel from "./CoolCarousel";
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
      <IngredientGraph data={state.search} />
      {state.recipes && <CoolCarousel recipes={state.recipes} />}
    </>
  );
}
export default Ingredient;
