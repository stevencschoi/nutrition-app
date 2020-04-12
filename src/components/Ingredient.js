import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { Carousel } from "react-responsive-carousel";
import RecipeCard from "./RecipeCard";
import RecipeCarousel from "./RecipeCarousel";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

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
      .then((result) => console.log(result))
      // .then((result) => {
      //   const searchResultsArray = result.data.hints.map((item) => {
      //     const id = `${item.food.foodId}`;
      //     const label = `${item.food.label}`;
      //     const image = `${item.food.image}`;
      //     return <Recipe id={id} label={label} image={image} />;
      //   });
      //   setSearch(searchResultsArray);
      // })
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
      {recipes && <RecipeCarousel recipes={recipes} />}
      <Link to={"/"}>Home</Link>
    </>
  );
}
export default Ingredient;
