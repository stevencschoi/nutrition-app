import React from "react";
import "./styles.scss";

function ScheduleItem(props) {
  // const removeFromSchedule = () => {

  // };
  return (
    <>
      {/* <h2>{props.currentDate}</h2> */}
      <h4>{props.name}</h4>
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
