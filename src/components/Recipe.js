import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeGraph from "./RecipeGraph";
import RecipeGraph1 from "./RecipeGraph1";
import Cookies from "js-cookie";
import Button from "./Button";
import MealCalendar from "./MealCalendar";
import IngredientGraph from "./IngredientGraph";
import { Dropdown } from "semantic-ui-react";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

export default function Recipe({ props, match }) {
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState(null);
  const [foodName, setFoodName] = useState(match.params.id);
  const [foodIngredient, setFoodIngredient] = useState();
  const [mode, setMode] = useState("");

  const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
  const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;

  useEffect(() => {
    fetchRecipes(foodName);
  }, [props]);

  useEffect(() => {
    // console.log("meal", meal);
  }, [meal]);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;

  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        setFoodIngredient(result.data);
        // addRecipe();
        // console.log("real data q", result.data.q);
        // console.log("real data hits", result.data.hits[0].recipe);
        // console.log(result.data.hits[0].recipe.totalTime);
      })
      .catch((error) => console.error(error));
  }

  const addToFav = (recipeId) => {
    const currentUser = Cookies.get("userId");
    console.log(currentUser, recipeId);

    axios
      .post("/addToFavourites", { userId: currentUser, recipeId: recipeId })
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const addRecipe = () => {
    // const userId = Cookies.get("userId");
    // const formatdate = JSON.stringify(date._d).slice(1, 11);
    // const recipeName = foodIngredient.q;

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
      .post(
        // `/addRecipe?userId=${userId}&date=${formatdate}&recipeName=${recipeName}&image=${image}&mealNumber=${meal}`
        `/addRecipe`,
        {
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
        }
      )
      .then((result) => {
        // console.log("IDDDDDDDD????", result);
        checkIfInDatabase();
      })
      .catch((error) => console.error(error));
  };

  const checkIfInDatabase = () => {
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
      .post(
        `/checkRecipe?recipeName=${recipeName}&calories=${calories}&fatInG=${fat_in_g}&carbsInG=${carbs_in_g}&proteinInG=${protein_in_g}&sugarInG=${sugar_in_g}&fiberInG=${fiber_in_g}&cholesterolInMg=${cholesterol_in_mg}&sodiumInMg=${sodium_in_mg}&imageUrl=${image_url}`
      )
      .then((result) => {
        // console.log("result from the backend", result.data);
        if (result.data.length === 0) {
          addRecipe();
          // console.log("result.data.length is = 0");
        } else if (mode === "Favourites") {
          // console.log("result.data.length is NOT = 0", result);
          addToFav(result.data[0].id);
        } else {
          addRecipeToDay(result.data[0].id);
        }
        // setMode("")
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log("date", date);
  }, [date]);

  const addRecipeToDay = (recipeId) => {
    console.log(date);
    // const recipeId = recipeId;
    // const date =
    const mealNumber = meal;
  };

  const options = [
    { key: 1, text: "Breakfast", value: "1" },
    { key: 2, text: "Lunch", value: "2" },
    { key: 3, text: "Dinner", value: "3" },
    { key: 4, text: "Other", value: "4" },
  ];

  return (
    <div>
      {foodName && foodIngredient && setMode("Favourites") && (
        <Button onClick={checkIfInDatabase}>Add to Favourites</Button>
      )}
      <MealCalendar date={date} onChange={(e) => setDate(e.target.value)} />

      {date && (
        <Dropdown
          options={options}
          selection
          onChange={(e, { value }) => setMeal(value)}
        />
      )}
      {date && meal && setMode("") && (
        <Button
          onClick={
            checkIfInDatabase
            // addRecipeToDay(date, foodIngredient.hits[0].recipe.image, meal)
          }
        >
          Add to Schedule
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
        <h1>Select Nutritional Data of {foodIngredient && foodIngredient.q}</h1>
        <br></br>
        <br></br>
        <RecipeGraph1 foodIngredient={foodIngredient} />
      </div>
      <RecipeIngredient foodIngredient={foodIngredient} />
    </div>
  );
}
