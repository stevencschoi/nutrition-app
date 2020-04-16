import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import FavouritesItem from "./FavouritesItem";

const Favourites = (props) => {
  const [userFavourites, setUserFavourites] = useState("");
  const [updateItem, setUpdateItem] = useState();

  useEffect(() => {
    const currentUser = Cookies.get("userId");

    axios
      .get("/favourites", { userId: currentUser })
      .then((result) => {
        setUserFavourites(result.data);
      })
      .catch((error) => console.error(error));
  }, [userFavourites]);

  const renderFavourites = (userFavourites) => {
    const favArr = userFavourites.map((item) => {
      const name = `${item.recipe_name}`;
      const id = `${item.id}`;
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
      {userFavourites && renderFavourites(userFavourites)}
    </>
  );
};

export default Favourites;
