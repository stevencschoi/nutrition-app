import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
// component to be rendered displaying a raw ingredient search results
import SearchResult from "../components/SearchResult";
// component to be rendered as part of recipe search results
import RecipeCard from "../components/RecipeCard";

// stretch assignment to include sockets for real-time data updating
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const dbId = process.env.REACT_APP_FOOD_DATABASE_ID;
const dbKey = process.env.REACT_APP_FOOD_DATABASE_KEY;
const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

export default function useApplicationData() {
  const [state, setState] = useState({
    search: "",
    recipes: [],
    users: [],
    pick: "Calories",
    data: null,
    graph: "Calories",
  });

  // display raw ingredient search results from home page
  function fetchSearchResults(ingredient) {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=raw%20${ingredient}&app_id=${dbId}&app_key=${dbKey}`
      )
      .then((result) => {
        const searchResultsArray = result.data.hints.map((item) => {
          if (item.food.image) {
            const code = `${item.food.foodId}`;
            const label = `${item.food.label}`;
            const image = `${item.food.image}`;
            return (
              <SearchResult key={code} id={code} label={label} image={image} />
            );
          }
        });
        setState((prev) => ({
          ...prev,
          search: searchResultsArray,
        }));
      })
      .catch((error) => console.error(error));
  }

  // display nutrition charts based on raw ingredient search
  const getNutrients = (ingredient) => {
    axios
      .post(
        `https://api.edamam.com/api/food-database/nutrients?app_id=${dbId}&app_key=${dbKey}`,
        {
          ingredients: [
            {
              quantity: 100,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: `${ingredient}`,
            },
          ],
        }
      )
      .then((result) => {
        setState((prev) => ({ ...prev, search: result.data }));
      })
      .catch((error) => console.error(error));
  };

  // for each object in recipes array, return a div containing the recipe image and title and id
  function fetchRecipes(searchResult) {
    axios
      .get(
        `https://api.edamam.com/search?q=${searchResult}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
      )
      .then((result) => {
        const recipeCardsArray = result.data.hits.map((recipe) => {
          const label = `${recipe.recipe.label}`;
          const image = `${recipe.recipe.image}`;
          const url = `${recipe.recipe.url}`;
          const ingredients = `${recipe.recipe.ingredientLines}`;

          return (
            <RecipeCard
              key={label}
              label={label}
              image={image}
              url={url}
              ingredients={ingredients}
            />
          );
        });
        setState((prev) => ({ ...prev, recipes: recipeCardsArray }));
      })
      .catch((error) => console.error(error));
  }

  // ******************** follower functions ********************

  // get followers array
  function getFollowers() {
    axios
      .get("/user/following")
      .then((result) => {
        console.log("Followers", result);
        result.data.forEach((follower) => {
          console.log(follower.follow_id);

          // return follower.follow_id;
        });
      })
      .catch((error) => console.error(error));
  }

  // follow user function
  function follow(userId) {
    console.log("id: ", userId);
    axios
      // .post(`/user/add?followId=${userId}`)
      .post("user/add", {
        followId: userId,
      })
      .then((result) => {
        console.log("response: ", result);
        getFollowers();
        // setState(prev => ({ ...prev, following: result}))
      })
      .catch((error) => console.error(error));
  }

  // display users in carousel
  function fetchUsers() {
    axios
      .get("/user/all")
      .then((result) => {
        const usersArray = result.data.map((user) => {
          const id = user.id;
          const label = user.name;
          const image = user.avatar;

          return (
            <RecipeCard
              key={id}
              label={label}
              image={image}
              follow={() => {
                follow(user.id);
              }}
            />
          );
        });
        setState((prev) => ({
          ...prev,
          users: usersArray,
        }));
      })
      .catch((error) => console.error(error));
  }

  // ******************** sockets ********************
  useEffect(() => {
    socket.onopen = function () {
      socket.send("ping");
    };
  }, []);

  // socket.onmessage = function(event) {
  //   // parse message from server
  //   const msg = JSON.parse(event.data);
  //   // listen for EDIT_SLOT and update state
  //   if (msg.type === "EDIT_SLOT") {
  //     updateAppointment(msg.id, msg.interview);
  //   }
  // };

  // close connection
  socket.onclose = function () {
    console.log("Connection closed");
  };
  // ****************************************

  return {
    state,
    fetchSearchResults,
    getNutrients,
    fetchRecipes,
    fetchUsers,
    getFollowers,
    // getData,
    // setPick,
  };
}
