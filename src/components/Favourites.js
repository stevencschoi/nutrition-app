import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import FavouritesItem from "./FavouritesItem";

const Favourites = props => {
  const [userfavourites, setUserfavourites] = useState("");

  useEffect(() => {
    const currentUser = Cookies.get('userId')

    axios.get
    ('/favourites',{ userId: currentUser })
    .then((result) => {
      // console.log(result.data)
      setUserfavourites(result.data)
    })
    .catch((error) => console.error(error));

  }, []);

  const makeItem = (userfavourites) => {

    console.log("THIS SHIT", userfavourites)

    const abc = userfavourites.map((item) => {
      const name = `${item.recipe_name}`;
      
      return (
        <FavouritesItem
          key={name}
          name={name}
        />
      )
    })
    return abc
  }

  return (
    <>
    <h1>Favourites</h1>
    {userfavourites && (makeItem(userfavourites))}
    </>
  );
};

export default Favourites;
