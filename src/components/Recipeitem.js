import React from "react";
import "./styles.scss";

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
