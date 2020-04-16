import React from "react";
import "./styles.scss";

function ScheduleItem(props) {
  return (
    <>
      <h2>{props.name}</h2>
      <img src={props.image} />
    </>
  );
}

export default ScheduleItem;
