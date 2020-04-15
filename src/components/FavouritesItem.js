import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import RecipeGraph from "./RecipeGraph";
import Cookies from "js-cookie";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

const FavouritesItem = (props) => {
  const [favouriteItem, setFavouriteItem] = useState();
  const [image, setImage] = useState();
  const [favId, setfavId] = useState(props.id);

  useEffect(() => {
    const recipeName = props.name;
    fetchFavourites(recipeName);
  }, []);

  function fetchFavourites(recipeName) {
    axios
      .get(
        `https://api.edamam.com/search?q=${recipeName}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        console.log("result.data.hits", result.data.hits[0].recipe.image);
        setFavouriteItem(result.data);
        setImage(result.data.hits[0].recipe.image);
      })
      .catch((error) => console.error(error));
  }

  const deleteFav = () => {
    const currentUser = Cookies.get("userId");
    console.log("props.id", props.id);
    const favId = props.id;
    axios
      .post("/deleteFavourite", { userId: currentUser, favId: favId })
      .then((result) => {
        props.setUpdateItem(favId);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>{props.name}</h2>
      <div>
        <img src={image} />
      </div>
      <button>Add to Schedule</button>
      {props.id && <button onClick={deleteFav}>Delete</button>}

      <RecipeGraph foodIngredient={favouriteItem} />
    </>
  );
};

export default FavouritesItem;
