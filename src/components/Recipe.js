import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import "./recipe.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeGraph from "./RecipeGraph";
import Button from "./Button";
import MealCalendar from "./MealCalendar";
import { Link } from "react-router-dom";
import { socket } from "../hooks/useApplicationData";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

export default function Recipe({ match }) {
  const [date, setDate] = useState(null);
  const [foodName, setFoodName] = useState(match.params.id);
  const [foodIngredient, setFoodIngredient] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    fetchRecipes(foodName);
  }, []);

  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        // confirm that a recipe is retrieved from Edamam
        if (result.data.hits[0] !== undefined) {
          setFoodIngredient(result.data);
        } else if (result.data.hits[0] === undefined) {
          setFoodIngredient("no recipe");
        }
      })
      .catch((error) => console.error(error));
  }

  const addToFav = (recipeId) => {
    axios
      .post("/favourites/add", { recipeId: recipeId })
      .catch((error) => console.error(error));
  };

  const addRecipe = () => {
    const recipeName = foodIngredient.q;
    const recipe_yield = foodIngredient.hits[0].recipe.yield;
    const calories =
      +(foodIngredient.hits[0].recipe.totalNutrients.ENERC_KCAL.quantity / recipe_yield).toFixed(2);
    const fat_in_g = +(foodIngredient.hits[0].recipe.totalNutrients.FAT.quantity / recipe_yield).toFixed(2);
    const carbs_in_g =
      +(foodIngredient.hits[0].recipe.totalNutrients.CHOCDF.quantity / recipe_yield).toFixed(2);
    const protein_in_g =
      +(foodIngredient.hits[0].recipe.totalNutrients.PROCNT.quantity / recipe_yield).toFixed(2);
    const sugar_in_g =
      +(foodIngredient.hits[0].recipe.totalNutrients.SUGAR.quantity / recipe_yield).toFixed(2);
    const fiber_in_g =
      +(foodIngredient.hits[0].recipe.totalNutrients.FIBTG.quantity / recipe_yield).toFixed(2);
    const cholesterol_in_mg =
      +(foodIngredient.hits[0].recipe.totalNutrients.CHOLE.quantity / recipe_yield).toFixed(2);
    const sodium_in_mg =
      +(foodIngredient.hits[0].recipe.totalNutrients.NA.quantity / recipe_yield).toFixed(2);
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
        recipe_yield: recipe_yield,
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
        } else if (!date) {
          addToFav(result.data[0].id);
        } else {
          addRecipeToDay(result.data[0].id);
        }
      })
      .catch((error) => console.error(error));
  };

  const addRecipeToDay = (recipeId) => {
    const formatdate = JSON.stringify(date).slice(1, 11);
    axios
      .post(`/day/add`, {
        date: formatdate,
        recipeId: recipeId,
      })
      .then((result) => {
        console.log(result.data);
        socket.emit("new", (data) => {
          console.log("Socket sending from addrecipeTOday", data);
        });
        setDate("");
      })
      .catch((error) => console.error(error));
  };

  const clearLocalStorage = () => localStorage.removeItem('healthObj');
  
  if (foodIngredient === "no recipe") {
    return (
      <div className="recipe-container">
        <h1 className="h1-title">Sorry, an error occured.</h1>
        <Link to={"/"}>
          <Button
            default
            onClick={clearLocalStorage}
          >
            Start Over
                  </Button>
        </Link>
      </div>
    )
  } else if (foodIngredient !== null && (user)) {
    return (
      <>
        <div className="recipe-container">
          <div className="including-link">
            <Link to={"/"}>
              <Button 
              default
              onClick={clearLocalStorage}
              >
                Start Over
              </Button>
            </Link>
            <div className="recipe-header">
              <div className="recipe-image-and-graph">
                <div className="recipe-image">
                  {foodIngredient && (
                    <img src={foodIngredient.hits[0].recipe.image} alt="selected recipe" />
                  )}
                  {foodName && foodIngredient && (
                    <Button onClick={checkIfInDatabase}>
                      <i class="far fa-heart"></i>
                    </Button>
                  )}
                </div>
                <div class="ingredient-data">
                  <h2>
                    Nutritional Data of {foodIngredient && foodIngredient.q}
                  </h2>
                  <RecipeGraph foodIngredient={foodIngredient} />
                </div>
              </div>
            </div>
            <div className="instruction-info">
              <div className="addtoschedule">
                <div>
                  <h3>
                    <i class="far fa-calendar-alt"></i> Add to Your Meal Plan
                  </h3>
                  <MealCalendar
                    date={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                {date && (
                  <div className="recipe-button-container">
                    <div className="add">
                      <Button onClick={checkIfInDatabase}>
                        <i class="far fa-calendar-alt"></i> Add
                      </Button>
                    </div>
                    <div className="cancel">
                      <Button
                        onClick={() => {
                          setDate(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="instructions-and-link">
                <div className="ingredients">
                  <RecipeIngredient foodIngredient={foodIngredient} />
                </div>
                <div className="prep-time">
                  {foodIngredient &&
                    foodIngredient.hits[0].recipe.totalTime !== 0 && (
                      <h2>
                        Prep time: {foodIngredient.hits[0].recipe.totalTime} mins
                      </h2>
                    )}
                </div>
                <div className="recipe-link">
                  {foodIngredient && (
                    <a href={foodIngredient.hits[0].recipe.url}>
                      {" "}
                      <h3>Click here for full instructions</h3>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (foodIngredient !== null && (!user)) {
    return (
      <>
        <div className="recipe-container">
          <div className="including-link">
            <Link to={"/"}>
              <Button
                default
                onClick={clearLocalStorage}
              >
                Start Over
              </Button>
            </Link>
            <div className="recipe-header">
              <div className="recipe-image-and-graph">
                <div className="recipe-image">
                  {foodIngredient && (
                    <img src={foodIngredient.hits[0].recipe.image} alt="selected recipe" />
                  )}
                </div>
                <div class="ingredient-data">
                  <h2>
                    Nutritional Data of {foodIngredient && foodIngredient.q}
                  </h2>
                  <RecipeGraph foodIngredient={foodIngredient} />
                </div>
              </div>
            </div>
            <div className="instruction-info">
              <div className="instructions-and-link">
                <div className="ingredients">
                  <RecipeIngredient foodIngredient={foodIngredient} />
                </div>
                <div className="prep-time">
                  {foodIngredient &&
                    foodIngredient.hits[0].recipe.totalTime !== 0 && (
                      <h2>
                        Prep time: {foodIngredient.hits[0].recipe.totalTime} mins
                      </h2>
                    )}
                </div>
                <div className="recipe-link">
                  {foodIngredient && (
                    <a href={foodIngredient.hits[0].recipe.url}>
                      {" "}
                      <h3>Click here for full instructions</h3>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}
