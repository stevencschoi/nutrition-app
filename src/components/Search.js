import React, { useState, Fragment } from "react";
import "./styles.css";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function Search(props) {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState();

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
      <h2>Hello {props.name},</h2>
      <h2>What ingredient would you like to start with?</h2>
      <div class="ingredient">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes(ingredient);
          }}
        >
          <input
            type="text"
            placeholder="enter an ingredient"
            value={props.name}
            onChange={(e) => {
              setIngredient(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
        <code>{JSON.stringify(recipes)}</code>
      </div>
    </>
  );
}

export default Search;
