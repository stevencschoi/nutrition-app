import React from "react";
import "./styles.css";

function Recipeitem(props) {
  return (
    <>
    <li>
      {props.item}
    </li>
    </>
  );
}

export default Recipeitem;
