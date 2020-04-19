import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeGraph from "./RecipeGraph";
import RecipeGraph1 from "./RecipeGraph1";
import Button from "./Button";
import MealCalendar from "./MealCalendar";
import IngredientGraph from "./IngredientGraph";
import { Dropdown } from "semantic-ui-react";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;

export default function Recipe({ props, match }) {
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState(null);
  const [foodName, setFoodName] = useState(match.params.id);
  const [foodIngredient, setFoodIngredient] = useState(null);

  useEffect(() => {
    fetchRecipes(foodName);
  }, []);

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

  const addToFav = (recipeId) => {
    console.log("recipeId", recipeId);

    axios
      .post("/favourites/add", { recipeId: recipeId })
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const addRecipe = () => {
    const recipeName = foodIngredient.q;
    const calories =
      foodIngredient.hits[0].recipe.totalNutrients.ENERC_KCAL.quantity;
    const fat_in_g = foodIngredient.hits[0].recipe.totalNutrients.FAT.quantity;
    const carbs_in_g =
      foodIngredient.hits[0].recipe.totalNutrients.CHOCDF.quantity;
    const protein_in_g =
      foodIngredient.hits[0].recipe.totalNutrients.PROCNT.quantity;
    const sugar_in_g =
      foodIngredient.hits[0].recipe.totalNutrients.SUGAR.quantity;
    const fiber_in_g =
      foodIngredient.hits[0].recipe.totalNutrients.FIBTG.quantity;
    const cholesterol_in_mg =
      foodIngredient.hits[0].recipe.totalNutrients.CHOLE.quantity;
    const sodium_in_mg =
      foodIngredient.hits[0].recipe.totalNutrients.NA.quantity;
    const image_url = foodIngredient.hits[0].recipe.image;

    axios
      .post(`/recipe/add`, {
        recipeName: recipeName,
        calories: calories,
        fatInG: fat_in_g,
        carbsInG: carbs_in_g,
        proteinInG: protein_in_g,
        sugarInG: sugar_in_g,
        fiberInG: fiber_in_g,
        cholesterolInMg: cholesterol_in_mg,
        sodiumInMg: sodium_in_mg,
        imageUrl: image_url,
      })
      .then((result) => {
        checkIfInDatabase();
      })
      .catch((error) => console.error(error));
  };

  const checkIfInDatabase = () => {
    const recipeName = foodIngredient.q;

    axios
      .post(`/recipe/check?recipeName=${recipeName}`)
      .then((result) => {
        if (result.data.length === 0) {
          addRecipe();
        } else if (!meal) {
          addToFav(result.data[0].id);
        } else {
          addRecipeToDay(result.data[0].id);
        }
      })
      .catch((error) => console.error(error));
  };

  const addRecipeToDay = (recipeId) => {
    const formatdate = JSON.stringify(date).slice(1, 11);
    const mealNumber = meal;

    axios
      .post(`/day/add`, {
        date: formatdate,
        recipeId: recipeId,
        mealNumber: mealNumber,
      })
      .then((result) => {
        console.log(result.data);
        setDate("");
      })
      .catch((error) => console.error(error));
  };

  const options = [
    { key: 1, text: "Breakfast", value: "1" },
    { key: 2, text: "Lunch", value: "2" },
    { key: 3, text: "Dinner", value: "3" },
    { key: 4, text: "Other", value: "4" },
  ];

  return (
    <div>
      {foodName && foodIngredient && (
        <Button onClick={checkIfInDatabase}>
          <i class="far fa-heart"></i>
        </Button>
      )}
      <MealCalendar date={date} onChange={(e) => setDate(e.target.value)} />

      {date && (
        <Dropdown
          options={options}
          selection
          onChange={(e, { value }) => setMeal(value)}
        />
      )}
      {date && meal && (
        <Button onClick={checkIfInDatabase}>
          <i class="far fa-calendar-alt"></i> Add
        </Button>
      )}
      {foodIngredient && <img src={foodIngredient.hits[0].recipe.image} />}
      {foodIngredient && (
        <a href={foodIngredient.hits[0].recipe.url}> Full Instructions</a>
      )}
      {foodIngredient && foodIngredient.hits[0].recipe.totalTime != 0 && (
        <h5>Takes around {foodIngredient.hits[0].recipe.totalTime} mins</h5>
      )}
      <div class="nutritional-data">
        <h2>Select Nutritional Data of {foodIngredient && foodIngredient.q}</h2>
        <RecipeGraph1 foodIngredient={foodIngredient} />
      </div>
      <RecipeIngredient foodIngredient={foodIngredient} />
    </div>
  );
}
