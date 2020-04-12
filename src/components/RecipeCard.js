import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function RecipeCard(props) {
  return (
    <Link to={`/ingredient/${props.id}`}>
      <div id={props.id}>
        <img src={props.image} />
        <h4 className="legend">{props.label}</h4>
      </div>
    </Link>
  );
}

export default RecipeCard;
