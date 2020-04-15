import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import FavouritesItem from "./FavouritesItem";

const Favourites = (props) => {
  const [userfavourites, setUserfavourites] = useState("");
  const [updateItem, setUpdateItem] = useState();

  useEffect(() => {
    const currentUser = Cookies.get("userId");

    axios
      .get("/favourites", { userId: currentUser })
      .then((result) => {
        // console.log(result.data)
        setUserfavourites(result.data);
      })
      .catch((error) => console.error(error));
  }, [updateItem]);

  const renderFavourites = (userFavourites) => {
    const favArr = userFavourites.map((item) => {
      const name = `${item.recipe_name}`;
      const id = `${item.id}`;
      console.log(item.recipe);
      return (
        <FavouritesItem
          key={name}
          id={id}
          name={name}
          setUpdateItem={setUpdateItem}
        />
      );
    });
    return favArr;
  };

  return (
    <>
      <h1>Favourites</h1>
      {userfavourites && renderFavourites(userfavourites)}
    </>
  );
};

export default Favourites;
