import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;

function SearchResult({ props, match }) {
  const [search, setSearch] = useState();

  useEffect(() => {
    getRecipe();
    console.log(match.params.id);
  }, []);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;

  const getRecipe = () => {
    axios
      .post(
        `${proxyUrl}https://api.edamam.com/api/food-database/nutrients?app_id=${dbId}&app_key=${dbKey}`,
        {
          ingredients: [
            {
              quantity: 100,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: `${match.params.id}`,
            },
          ],
        }
      )
      // axios({
      //   url: `${proxyUrl}https://api.edamam.com/api/food-database/nutrients?app_id=${dbId}&app_key=${dbKey}`,
      //   method: "POST",
      //   dataType: "json",
      // })
      .then((result) => console.log(result))
      // .then((result) => {
      //   const searchResultsArray = result.data.hints.map((item) => {
      //     const id = `${item.food.foodId}`;
      //     const label = `${item.food.label}`;
      //     const image = `${item.food.image}`;
      //     return <Recipe id={id} label={label} image={image} />;
      //   });
      //   setSearch(searchResultsArray);
      // })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Link to={"/"}>Home</Link>
    </>
  );
}

export default SearchResult;
