import React, {useState ,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
    // console.log(Cookies.get("session"))
  }, [props]);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;

  function fetchRecipes(ingredient) {
    axios
      .get(
        `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        // console.log(Cookies.get('userId'))
        setFoodIngredient(result.data);
      })
      .catch((error) => console.error(error));
  }

  const addToFav = () => {

  const currentUser = Cookies.get('userId')
  // const recipe = ingredient
  // console.log("123213213123", foodName)

    axios.post
      ('/addToFavourites', {userId: currentUser, recipeName: foodName})
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
    {foodName && (<button onClick={addToFav}>Add me</button>)}
    <div>
      <h2>{match.params.id}</h2>
      <RecipeGraph foodIngredient={foodIngredient}/>
      <RecipeIngredient foodIngredient={foodIngredient}/>
    </div>
    </>
  );
}