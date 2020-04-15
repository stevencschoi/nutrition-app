import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default function ScheduleDay(props) {
  const [day, setDay] = useState(JSON.stringify(props.date._d));

  // useEffect(() => {
  //   const time = day.split("T"));
  //   console.log(time[0]);
  // });

  const addRecipeSlot = () => {
    const formatdate = JSON.stringify(props.date._d).slice(1, 11);

    axios
      .get(`/addSlot`, {
        name: name,
        date: formatdate,
        userId: userId,
        favId: favId,
      })
      .then((result) => {
        console.log("it's in");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>{day && props.dayListarr}</div>
      <button
        onClick={() => {
          addSlot();
        }}
      >
        Add
      </button>
    </>
  );
}
