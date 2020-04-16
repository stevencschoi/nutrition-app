import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeGraph from "./RecipeGraph";
import Cookies from "js-cookie";
import Button from "./Button";
import MealCalendar from "./MealCalendar";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

export default function Recipe({ props, match }) {
  const [date, setDate] = useState(null);
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
        console.log(result.data)
        console.log(result.data.hits[0].recipe.totalTime)
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

  const addRecipeToDay = (date, image) => {
    const userId = Cookies.get("userId");
    const formatdate = JSON.stringify(date._d).slice(1, 11);
    const recipeName = foodIngredient.q;

    axios
      .post(
        `/addRecipe?userId=${userId}&date=${formatdate}&recipeName=${recipeName}&image=${image}`
      )
      .then((result) => {
        setDate(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {foodName && <Button onClick={addToFav}>Add to Favourites</Button>}
      <MealCalendar date={date} onChange={(e) => setDate(e.target.value)} />
      {date && (
        <Button onClick={() => addRecipeToDay(date, foodIngredient.hits[0].recipe.image)}>
          Add to Schedule
        </Button>
      )}
      {foodIngredient && <img src={foodIngredient.hits[0].recipe.image} />}
      {foodIngredient && <a href={foodIngredient.hits[0].recipe.url}> Full Instructions</a>}
      {foodIngredient && foodIngredient.hits[0].recipe.totalTime != 0 && <h5>Takes around {foodIngredient.hits[0].recipe.totalTime} mins</h5>}
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
