import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ScheduleItem from "./ScheduleItem";
import MealCalendar from "./MealCalendar";
import moment from "moment";

function Schedule() {
  const [cal, setCal] = useState(null);
  const [currentDay, setCurrentDay] = useState(moment());
  const [update, setUpdate] = useState(moment());

  // when currentDay state is updated, display that day's meal schedule
  useEffect(() => {
    getDaySchedule(currentDay.format("YYYY-MM-DD"));
  }, [currentDay, update]);

  // make get request to server and map results to the page
  const getDaySchedule = (currentDate) => {
    axios
      .get(`/day?date=${currentDate}`)
      .then((result) => {
        const itemArr = result.data.map((item) => {
          const itemId = item.id
          const itemName = item.recipe_name;
          const image = item.image;

          return <ScheduleItem name={itemName} image={image} id={itemId} setUpdate={setUpdate}/>;
        });
        setCal(itemArr);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <MealCalendar
        date={currentDay}
        onChange={(e) => setCurrentDay(e.target.value)}
      />
      {cal && cal}
    </>
  );
}

export default Schedule;
