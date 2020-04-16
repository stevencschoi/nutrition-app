import React from "react";
import "./styles.scss";

function ScheduleItem(props) {
  // const removeFromSchedule = () => {

  // };
  return (
    <>
      <h2>{props.name}</h2>
      <img src={props.image} />
      {/* <button
        onClick={() => {
          removeFromSchedule();
        }}
      >
        DELETE
      </button> */}
    </>
  );
}

export default ScheduleItem;
