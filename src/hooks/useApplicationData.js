import React, { useState, useEffect } from "react";
import axios from "axios";
// component to be rendered displaying a raw ingredient search results
import SearchResult from "../components/SearchResult";
// component to be rendered as part of recipe search results
import RecipeCard from "../components/RecipeCard";
import io from "socket.io-client";
// socket declaration
export const socket = io(process.env.REACT_APP_WEBSOCKET_URL);
const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;
export default function useApplicationData() {
  const [state, setState] = useState({
    search: "",
    recipes: [],
    pick: "Calories",
    data: null,
    graph: "Calories",
  });
  // connect socket
  useEffect(() => {
    socket.on("connect", () => {
      console.log("is socket connected?", socket.connected);
    });
  }, []);
  // display raw ingredient search results from home page
  function fetchSearchResults(ingredient) {
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=${ingredient}&app_id=${dbId}&app_key=${dbKey}`
      )
      .then((result) => {
        const searchResultsArray = result.data.hints.map((item) => {
          if (item.food.image) {
            const code = `${item.food.foodId}`;
            const label = `${item.food.label}`;
            const image = `${item.food.image}`;
            return (
              <SearchResult key={code} id={code} label={label} image={image} />
            );
          }
        });
        setState((prev) => ({
          ...prev,
          search: searchResultsArray,
        }));
      })
      .catch((error) => console.error(error));
  }
  // display nutrition charts based on raw ingredient search
  const getNutrients = (ingredient) => {
    axios
      .post(
        `https://api.edamam.com/api/food-database/nutrients?app_id=${dbId}&app_key=${dbKey}`,
        {
          ingredients: [
            {
              quantity: 100,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: `${ingredient}`,
            },
          ],
        }
      )
      .then((result) => {
        setState((prev) => ({ ...prev, search: result.data }));
      })
      .catch((error) => console.error(error));
  };
  // for each object in recipes array, return a div containing the recipe image and title and id
  function fetchRecipes(searchResult, diet, health) {
    axios
      .get(
        `https://api.edamam.com/search?q=${searchResult}${diet}${health}app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        const recipeCardsArray = result.data.hits.map((recipe) => {
          const label = `${recipe.recipe.label}`;
          const image = `${recipe.recipe.image}`;
          const url = `${recipe.recipe.url}`;
          const ingredients = `${recipe.recipe.ingredientLines}`;
          return (
            <RecipeCard
              key={label}
              label={label}
              image={image}
              url={url}
              ingredients={ingredients}
            />
          );
        });
        setState((prev) => ({ ...prev, recipes: recipeCardsArray }));
      })
      .catch((error) => console.error(error));
  }
  return {
    state,
    fetchSearchResults,
    getNutrients,
    fetchRecipes,
  };
}
