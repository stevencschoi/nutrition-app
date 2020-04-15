import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeGraph from "./RecipeGraph";
import Cookies from "js-cookie";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

export default function Recipe({ props, match }) {
  const [foodName, setFoodName] = useState(match.params.id);
  const [foodIngredient, setFoodIngredient] = useState();
  const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
  const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;

  useEffect(() => {
    fetchRecipes(foodName);
  }, [props]);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;

  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        setFoodIngredient(result.data);
      })
      .catch((error) => console.error(error));
  }

  const addToFav = () => {
    const currentUser = Cookies.get("userId");

    axios
      .post("/addToFavourites", { userId: currentUser, recipeName: foodName })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {foodName && <button onClick={addToFav}>Add me</button>}
      <div class="nutritional-data">
        <h1>Select Nutritional Data of {foodIngredient && foodIngredient.q}</h1>
        <br></br>
        <br></br>
        <RecipeGraph foodIngredient={foodIngredient} />
      </div>
      <RecipeIngredient foodIngredient={foodIngredient} />
    </div>
  );
}
