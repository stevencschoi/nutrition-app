import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import SearchResult from "./SearchResult";
import RecipeCarousel from "./RecipeCarousel";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { link } from "react-router-dom";

// const apiKey = process.env.REACT_APP_API_KEY;

const DATABASE_ID = process.env.REACT_APP_FOOD_DATABASE_ID;
const DATABASE_KEY = process.env.REACT_APP_FOOD_DATABASE_KEY;
const RECIPE_SEARCH_ID = process.env.REACT_APP_RECIPE_SEARCH_ID;
const RECIPE_SEARCH_KEY = process.env.REACT_APP_RECIPE_SEARCH_KEY;

console.log(
  `THISSSSS ${DATABASE_ID}, ${DATABASE_KEY}, ${RECIPE_SEARCH_ID}, ${RECIPE_SEARCH_KEY}`
);

console.log(DATABASE_ID);

function Home(props) {
  const [search, setSearch] = useState();
  const [recipes, setRecipes] = useState();
  // const [ingredientNutrition, setIngredientNutrition] = useState();

  // function fetchIngredientNutrition(ingredient) {
  //   axios
  //     .get(``)
  //     .then((result) => setIngredientNutrition(result))
  //     .catch((error) => console.error(error));
  // }

  // api call and set state to generate recipes from ingredient search

  function fetchSearchResults(ingredient) {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const apiId = "???";
    const apiKey = "???";
    // axios
    //   .get(
    //     `https://api.edamam.com/api/food-database/parser?ingr=${ingredient}&app_id=${apiId}&app_key=${apiKey}`
    //   )
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=raw%20${ingredient}&app_id=${apiId}&app_key=${apiKey}`
      )
      .then((result) => {
        const searchResultsArray = result.data.hints.map((item) => {
          const id = `${item.food.foodId}`;
          const label = `${item.food.label}`;
          const image = `${item.food.image}`;
          return <SearchResult id={id} label={label} image={image} />;
        });
        setSearch(searchResultsArray);
        // localStorage.setItem("currentData", searchResultsArray);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {!search && (
        <div>
          {/* <h2>Hello, {props.name}</h2> */}
          <h2>What ingredient are you starting with?</h2>
        </div>
      )}
      <Searchbar fetchSearchResults={fetchSearchResults} />
      {search}
      {search && (
        <div>
          <div>graph</div>
          <code>
            {/* Ingredient nutrition: {JSON.stringify(ingredientNutrition)} */}
          </code>
          <h3>ingredients</h3>
          {/* <RecipeCarousel recipes={ingredient} /> */}
          <code>ingredients Array: {JSON.stringify(search)}</code>
        </div>
      )}
    </>
  );
}

export default Home;

// const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//       interviewers={interviewers}
//       bookInterview={bookInterview}
//       deleteInterview={deleteInterview}
//     />
//   );
// });
