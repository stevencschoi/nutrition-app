import React, { useEffect, useState } from "react";
import "./styles.scss";
import "./favouritesItem1.scss";
import axios from "axios";
import Cookies from "js-cookie";
import FavouritesItem1 from "./FavouritesItem1";

const Favourites = (props) => {
  const [userFavourites, setUserFavourites] = useState("");
  const [updateItem, setUpdateItem] = useState();

  useEffect(() => {
    const currentUser = Cookies.get("userId");

    axios
      .get("/favourites")
      .then((result) => {
        setUserFavourites(result.data);
      })
      .catch((error) => console.error(error));
  }, [updateItem]);

  const renderFavourites = (userFavourites) => {
    const favArr = userFavourites.map((item) => {
      const id = `${item.id}`;
      const name = `${item.name}`;
      // const calories = `${item.calories}`;
      // const fat_in_g = `${item.fat_in_g}`;
      // const carbs_in_g = `${item.carbs_in_g}`;
      // const protein_in_g = `${item.protein_in_g}`;
      // const sugar_in_g = `${item.sugar_in_g}`;
      // const fiber_in_g = `${item.fiber_in_g}`;
      // const cholesterol_in_mg = `${item.cholesterol_in_mg}`;
      // const sodium_in_mg = `${item.sodium_in_mg}`;
      // const image_url = `${item.image_url}`;
      return (
        <FavouritesItem1
          setUpdateItem={setUpdateItem}
          key={name}
          id={id}
          name={name}
          calories={item.calories}
          fat_in_g={item.fat_in_g}
          carbs_in_g={item.carbs_in_g}
          protein_in_g={item.protein_in_g}
          sugar_in_g={item.sugar_in_g}
          fiber_in_g={item.fiber_in_g}
          cholesterol_in_mg={item.cholesterol_in_mg}
          sodium_in_mg={item.sodium_in_mg}
          image_url={item.image_url}
        />
      );
    });
    return favArr;
  };

  return (
    <>
      <h1 className="favourite-title">Favourites</h1>
      {userFavourites && renderFavourites(userFavourites)}
    </>
  );
};

export default Favourites;
