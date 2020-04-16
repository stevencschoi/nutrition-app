import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ScheduleItem from "./ScheduleItem";

function Schedule() {
  const [cal, setCal] = useState(null);

  useEffect(() => {
    let newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const separator = "-";

    const today = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;

    // console.log("today is ", shit);
    getDaySchedule(today);
  }, []);

  const getDaySchedule = (currentDate) => {
    // const userId = Cookies.get("userId");
    // console.log(userId, currentDate);

    axios
      .get(`/day?date=${currentDate}`)
      .then((result) => {
        console.log("this data", result.data);
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
      <h2>Data</h2>
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
