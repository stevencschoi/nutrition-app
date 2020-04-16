import React from "react";
// import Button from "./Button"
import "./styles.scss";
import axios from "axios";

function ScheduleItem(props) {
  const removeFromSchedule = (id) => {
    axios
    .delete(`/deleteFromSlot?dateId=${id}`)
    .then((result) => {
      props.setUpdate(result)
      // console.log(result);
    })
    .catch((error) => console.error(error));
  };
  return (
    <>
      <h2>{props.name}</h2>
      <img src={props.image} />
      <button
        onClick={() => {
          removeFromSchedule(props.id);
        }}
      >
        Remove From Schedule
      </button>
    </>
  );
}

export default ScheduleItem;
