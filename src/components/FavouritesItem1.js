import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import RecipeGraph from "./RecipeGraph";
import Cookies from "js-cookie";
import MealCalendar from "./MealCalendar";
import Button from "./Button";
import DayRecipeSlot from "./DayRecipeSlot";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";

import io from "socket.io-client";
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const FavouritesItem1 = (props) => {
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState(null);

  const deleteFav = () => {
    const id = props.id;

    axios
      .post("/favourites/delete", { recipeId: id })
      .then((result) => {
        props.setUpdateItem(id);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  // add a recipe to a given day
  const addRecipeToDay = (id, date, meal) => {
    const formatdate = JSON.stringify(date).slice(1, 11);
    const recipeId = id;

    // send socket emit to server to update graphs
    // socket.emit("update", (date) => {
    //   socket.send(date);
    // });

    axios
      .post("/day/add", {
        date: `${formatdate}`,
        recipeId: `${recipeId}`,
        mealNumber: `${meal}`,
      })
      .then((result) => {
        setDate(null);
      })
      .catch((error) => console.error(error));
  };

  const options = [
    { key: 1, text: "Breakfast", value: "1" },
    { key: 2, text: "Lunch", value: "2" },
    { key: 3, text: "Dinner", value: "3" },
    { key: 4, text: "Other", value: "4" },
  ];

  return (
    <>
      <div className="FavouritesItem">
        <div>
          <img src={props.image_url} />
          {/* <h1 className="FavouritesTitle">{props.name}</h1> */}
        </div>
        <div>
          <RecipeGraph
            calories={props.calories}
            fat_in_g={props.fat_in_g}
            carbs_in_g={props.carbs_in_g}
            protein_in_g={props.protein_in_g}
            sugar_in_g={props.sugar_in_g}
            fiber_in_g={props.fiber_in_g}
            cholesterol_in_mg={props.cholesterol_in_mg}
            sodium_in_mg={props.sodium_in_mg}
            image_url={props.image_url}
            name={props.name}
          />
          <div className="selectPosition">
            <div className="selectContainer">
              <div>
                <MealCalendar
                  date={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                {date && (
                  <Dropdown
                    options={options}
                    selection
                    onChange={(e, { value }) => setMeal(value)}
                  />
                )}
              </div>
              {date && meal && (
                <>
                  <div className="add">
                    <Button
                      onClick={() => addRecipeToDay(props.id, date, meal)}
                    >
                      Add to Schedule
                    </Button>
                  </div>
                  <div className="delete">
                    <Button onClick={() => setDate(null)}>Cancel</Button>
                  </div>
                </>
              )}
            </div>
            <div className="delete">
              {props.id && (
                <Button onClick={deleteFav}>Remove from Favourites</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavouritesItem1;
