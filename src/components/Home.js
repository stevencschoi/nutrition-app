import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { link } from 'react-router-dom'

const apiKey = process.env.REACT_APP_API_KEY;

function Home(props) {

  const [recipes, setRecipes] = useState();
  // const [ingredientNutrition, setIngredientNutrition] = useState();

  // function fetchIngredientNutrition(ingredient) {
  //   axios
  //     .get(``)
  //     .then((result) => setIngredientNutrition(result))
  //     .catch((error) => console.error(error));
  // }

  // api call and set state to generate recipes from ingredient search
  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=5&query=${ingredient}`
      )
      .then((result) => setRecipes(result.data.results))
      .catch((error) => console.error(error));
  }

  return (
    <>
      {!recipes && (
        <div>
          {/* <h2>Hello, {props.name}</h2> */}
          <h2>What ingredient are you starting with?</h2>
        </div>
      )}
      <Searchbar fetchRecipes={fetchRecipes} />
      {recipes && (
        <div>
          <div>graph</div>
          <code>
            {/* Ingredient nutrition: {JSON.stringify(ingredientNutrition)} */}
          </code>
          <h3>Recipes</h3>
          <code>Recipes Array: {JSON.stringify(recipes)}</code>
        </div>
      )}
    </>
  );
}

export default Home;
