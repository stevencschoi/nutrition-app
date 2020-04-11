import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function Search(props) {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState();
  const [ingredientNutrition, setIngredientNutrition] = useState();
  const [show, setShow] = useState(true);

  function fetchIngredientNutrition(ingredient) {
    axios
      .get(``)
      .then((result) => setIngredientNutrition(result))
      .catch((error) => console.error(error));
  }

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
      {show && (
        <div>
          <h2>Hello, {props.name}</h2>
          <h2>What ingredient are you starting with?</h2>
        </div>
      )}
      {/* <div className="search-ingredient">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes(ingredient);
            setShow(false);
          }}
        >
          <input
            type="text"
            name="ingredient"
            value={props.name}
            onChange={(e) => {
            setIngredient(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
      </div> */}

      <div id="cover">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes(ingredient);
            setShow(false);
          }}
        >
          <div class="tb">
            <div class="td">
              <input
                type="text"
                name="ingredient"
                placeholder="Search"
                value={props.name}
                onChange={(e) => {
                  setIngredient(e.target.value);
                }}
                required
              />
            </div>
            <div class="td" id="s-cover">
              <button type="submit">
                <div id="s-circle"></div>
                <span></span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {!show && (
        <div>
          <div>graph</div>
          <code>
            Ingredient nutrition: {JSON.stringify(ingredientNutrition)}
          </code>
          <h3>Recipes</h3>
          <code>Recipes Array: {JSON.stringify(recipes)}</code>
        </div>
      )}
    </>
  );
}

export default Search;

// import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(mode, replace = false) {
//     if (!replace) {
//       setHistory(() => [...history, mode]);
//     }
//     setMode(() => mode);
//   }

//   function back() {
//     if (history[history.length - 1] !== initial) {
//       history.pop();
//       setMode(() => history[history.length - 1]);
//     }
//   }

//   return { mode, transition, back };
// }
