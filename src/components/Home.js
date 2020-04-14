import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import Searchbar from "./Searchbar";
import SearchResult from "./SearchResult";
import MealCalendar from "./MealCalendar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import moment from "moment";
// const apiKey = process.env.REACT_APP_API_KEY;

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;

// console.log(`THISSSSS ${dbId}, ${dbKey}`);

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
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=raw%20${ingredient}&app_id=${dbId}&app_key=${dbKey}`
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
        setSearch(searchResultsArray);
        // localStorage.setItem("currentData", searchResultsArray);
      })
      .catch((error) => console.error(error));
  }

  const [date, setDate] = useState(null);

  return (
    <>
      {!search && (
        <div>
          {/* <h2>Hello, {props.name}</h2> */}
          <h2>What ingredient are you starting with?</h2>
        </div>
      )}
      <Searchbar fetchSearchResults={fetchSearchResults} />
      <div className="search">{search}</div>
      {search && (
        <div>
          {/* <div>graph</div> */}
          {/* <code> */}
          {/* Ingredient nutrition: {JSON.stringify(ingredientNutrition)} */}
          {/* </code> */}
          {/* <h3>ingredients</h3> */}
          {/* <code>ingredients Array: {JSON.stringify(search)}</code> */}
        </div>
      )}
      <MealCalendar date={date} onChange={e => setDate(e.target.value)}/>
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
