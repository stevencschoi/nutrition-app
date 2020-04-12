import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipeCarousel from "./RecipeCarousel";
import IngredientGraph from "./IngredientGraph";

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

function Ingredient({ props, match }) {
  const [search, setSearch] = useState();
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const format = match.url.split("/");
    getNutrients(format[2]);
    fetchRecipes(format[3]);
  }, []);

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
      .then((result) => setSearch(result.data))
      .catch((error) => console.error(error));
  };

  // for each object in recipes array, return a div containing the recipe image and title and id
  function fetchRecipes(searchResult) {
    axios
      .get(
        `https://api.edamam.com/search?q=${searchResult}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        const recipeCardsArray = result.data.hits.map((recipe, index) => {
          const label = `${recipe.recipe.label}`;
          const image = `${recipe.recipe.image}`;
          const url = `${recipe.recipe.url}`;
          const ingredients = `${recipe.recipe.ingredientLines}`;

          // console.log("Recipe:", recipe);
          return (
            <RecipeCard
              key={index}
              label={label}
              image={image}
              url={url}
              ingredients={ingredients}
            />
          );
        });
        // console.log("recipeCardsArray", recipeCardsArray);
        setRecipes(recipeCardsArray);
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      <IngredientGraph data={search}/>
      {recipes && <RecipeCarousel recipes={recipes} />}
    </>
  );
}
export default Ingredient;
