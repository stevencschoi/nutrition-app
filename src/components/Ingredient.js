import React, { useState, useEffect, Fragment } from "react";
// import "./styles.scss";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipeCarousel from "./RecipeCarousel";
import IngredientGraph from "./IngredientGraph";
import CoolCarousel from "./CoolCarousel"

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
        setRecipes(recipeCardsArray);
      })
      .catch((error) => console.error(error));
  }

  let settings = {
    infinite: false,
    speed: 1000,
    // arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <>
      {/* <IngredientGraph data={search} /> */}
      {/* {recipes && <RecipeCarousel recipes={recipes} />} */}
      {/* <Slider {...settings}> */}
      {recipes && <CoolCarousel recipes={recipes}/>}
      {/* </Slider > */}
    </>
  );
}
export default Ingredient;
