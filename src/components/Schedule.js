import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ScheduleItem from "./ScheduleItem";
import MealCalendar from "./MealCalendar";
import moment from "moment";

// moment(testDate).format('MM/DD/YYYY');

function Schedule() {
  const [cal, setCal] = useState(null);
  const [currentDay, setCurrentDay] = useState(moment());

  useEffect(() => {
    console.log("todayyyyyyyyyy: ", currentDay.format("YYYY-MM-DD"));
    // console.log("in _d: ", currentDay._d);
    // const formatdate = JSON.stringify(currentDay._d).slice(1, 11);
    // console.log("formatdate", formatdate);

    // let newDate = new Date();
    // const date = newDate.getDate();
    // const month = newDate.getMonth() + 1;

    // if (month > 12) {
    //   month = 1;
    // }

    // console.log(month);
    // const year = newDate.getFullYear();
    // const separator = "-";

    // const today = `${year}${separator}${
    //   month < 10 ? `0${month}` : `${month}`
    // }${separator}${date}`;
    // console.log("today is ", shit);
    getDaySchedule(currentDay.format("YYYY-MM-DD"));
  }, [currentDay]);

  const getDaySchedule = (currentDate) => {
    // const userId = Cookies.get("userId");
    // console.log(userId, currentDate);

    axios
      .get(`/day?date=${currentDate}`)
      .then((result) => {
        // console.log("this data", result.data);
        const itemarr = result.data.map((item) => {
          const itemName = item.recipe_name;
          const image = item.image;

          return <ScheduleItem name={itemName} image={image} />;
        });
        setCal(itemarr);
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

// const getDaySchedule = (currentDate) => {
//   // const userId = Cookies.get("userId");
//   // console.log(userId, currentDate);

//   axios
//     .get(`/day?date=${currentDate}`)
//     .then((result) => {
//       console.log(result.data);
//       const itemarr = result.data.map((item) => {
//         const itemName = item.name;
//         return `<div>${itemName}</div>`;
//       });
//       setCal(itemarr);
//     })
//     .catch((error) => console.error(error));
// };
