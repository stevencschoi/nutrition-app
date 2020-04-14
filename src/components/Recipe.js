import React, {useState ,useEffect} from "react";
import axios from "axios";
import "./styles.css";
import RecipeIngredient from "./RecipeIngredient"
import RecipeGraph from "./RecipeGraph"
import FavouriteButton from "./FavouriteButton"


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
      <div class="nutritional-data">
        <h1>Select Nutritional Data of</h1>
        <h3>Calories:</h3>
        <br></br>
        <br></br>
        <RecipeGraph foodIngredient={foodIngredient}/>
      </div>
      <FavouriteButton foodName={foodName}/>
      <RecipeIngredient foodIngredient={foodIngredient}/>
    </div>
  );
}