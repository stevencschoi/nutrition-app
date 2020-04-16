import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import RecipeGraph from "./RecipeGraph";
import Cookies from "js-cookie";
import MealCalendar from "./MealCalendar";
// import ScheduleDay from "./ScheduleDay";
import DayRecipeSlot from "./DayRecipeSlot";
// import moment from "moment";

const recipeApiId = process.env.REACT_APP_RECIPE_SEARCH_ID;
const recipeApiKey = process.env.REACT_APP_RECIPE_SEARCH_KEY;

const FavouritesItem = (props) => {
  const [favouriteItem, setFavouriteItem] = useState();
  const [image, setImage] = useState();
  const [favId, setfavId] = useState(props.id);
  const [date, setDate] = useState(null);

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
        // console.log("result.data.hits", result.data.hits[0].recipe.image);
        setFavouriteItem(result.data);
        setImage(result.data.hits[0].recipe.image);
      })
      .catch((error) => console.error(error));
  }

  const deleteFav = () => {
    const currentUser = Cookies.get("userId");
    const favId = props.id;
    axios
      .post("/deleteFavourite", { userId: currentUser, favId: favId })
      .then((result) => {
        // refresh page on delete
        props.setUpdateItem(favId);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const [dayListarr, setDayListarr] = useState();

  const renderDaySlots = (date) => {
    const formatdate = JSON.stringify(date._d).slice(1, 11);

    axios
      .get(`/day`, { dayId: formatdate })
      .then((result) => {
        console.log(result.data);

        const dayList = result.data.map((item) => {
          const name = item.name;
          const image = item.image;
          const url = item.url;

          return (
            <DayRecipeSlot
              name={name}
              image={image}
              url={url}
              date={formatdate}
            />
          );
        });
        // console.log("dayLst", dayList);
        // if ((dayList = {})) {
        //   dayList = <DayRecipeSlot />;
        // }
        // else {
        //   dayList.append(<DayRecipeSlot />);
        // }
        // console.log("Date", date);
        setDayListarr(dayList);
        // return dayList;
      })
      .catch((error) => console.error(error));
  };

  const addRecipeToDay = (date, image) => {
    // add a recipe to a given day
    const userId = Cookies.get("userId");
    const formatdate = JSON.stringify(date._d).slice(1, 11);
    const recipeName = props.name;
    // console.log("imagelink: ", image);

    // console.log(userId, formatdate, recipeName, image);
    axios
      .post(
        `/addRecipe?userId=${userId}&date=${formatdate}&recipeName=${recipeName}&image=${image}`
      )
      .then((result) => {
        setDate(null);
        console.log("it's in");
      })
      .catch((error) => console.error(error));
  };

  // const addToFav = (date) => {
  //   const formatdate = JSON.stringify(date._d).slice(1, 11);
  //   const userId = Cookies.get('userId')
  //   const favId = props.id;
  //   const name = props.name;

  //   axios
  //     .get(`/addFavToDate`, { name: name, date: formatdate, userId: userId, favId:favId})
  //     .then((result) => {
  //       console.log("it's in");
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <>
      <h2>{props.name}</h2>
      <div>
        <img src={image} />
      </div>
      <MealCalendar date={date} onChange={(e) => setDate(e.target.value)} />
      {/* {date && (
        <ScheduleDay date={date} name={props.name} dayListarr={dayListarr} />
      )} */}
      {date && props.name && (
        <button onClick={() => addRecipeToDay(date, image)}>
          Add to Schedule
        </button>
      )}
      {props.id && <button onClick={deleteFav}>Delete</button>}

      <RecipeGraph foodIngredient={favouriteItem} />
    </>
  );
};

export default FavouritesItem;

// axios
//       .get(
//         `https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiId}&app_key=${recipeApiKey}`
//       )
//       .then((result) => {
//         setFoodIngredient(result.data);
//       })
//       .catch((error) => console.error(error));
