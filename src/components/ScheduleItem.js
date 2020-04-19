import React from "react";
import Button from "./Button";
import "./styles.scss";
import axios from "axios";
import { socket } from "../hooks/useApplicationData";

function ScheduleItem(props) {
  const removeFromSchedule = (id) => {
    axios
      .post("/day/delete", { dateId: id })
      .then((result) => {
        // send message to server to update data
        socket.emit("new", (data) => {
          console.log("From the delete function socket", data);
        });
        props.setUpdate(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>{props.name}</h2>
      <a href={`/recipe/${props.name}`}>
        <img src={props.image} />
      </a>
      <Button
        default
        onClick={() => {
          removeFromSchedule(props.id);
        }}
      >
        <i class="far fa-trash-alt"></i>
      </Button>
    </>
  );
}

export default ScheduleItem;
