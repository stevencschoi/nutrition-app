import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Schedule() {
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
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>Data</h2>
    </>
  );
}

export default Schedule;
