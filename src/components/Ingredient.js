import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function SearchResult(props) {
  const [search, setSearch] = useState();

  useEffect(() => {
    getRecipe();
  }, []);

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  const apiId = "???";
  const apiKey = "???";

  const getRecipe = () => {
    axios
      .post(
        `${proxyUrl}https://api.edamam.com/api/food-database/nutrients?app_id=${apiId}&app_key=${apiKey}`,
        {
          ingredients: [
            {
              quantity: 100,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: `${props.id}`,
            },
          ],
        }
      )
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
