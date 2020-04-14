import React, {useState ,useEffect} from "react";
import axios from "axios";
import "./styles.scss";
import RecipeIngredient from "./RecipeIngredient"
import RecipeGraph from "./RecipeGraph"


export default function Recipe({props, match}) {
  const [foodName, setFoodName ] = useState(match.params.id)
  const [foodIngredient, setFoodIngredient ] = useState()

  const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
  const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
  const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
  const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

  useEffect(() => {
    fetchRecipes(foodName)
  }, [props]);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;

  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        // console.log(result.data)
        setFoodIngredient(result.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h2>{match.params.id}</h2>
      <RecipeGraph foodIngredient={foodIngredient}/>
      <RecipeIngredient foodIngredient={foodIngredient}/>
    </div>
  );
}