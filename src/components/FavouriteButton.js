import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const FavouriteButton = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const save = () => {
    // console.log(props.foodName)
    axios
      .post(
        `localhost:8008/addToFavourites/`, { recipeId: props.foodName }
      )
      .then((result) => {
        // console.log(result.data)
      })
      .catch((error) => console.error(error));
  }

  return (
    <button onClick={save}>
      Add to Favourites
    </button>
  );
};

export default FavouriteButton;
