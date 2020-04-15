
import React from "react";
// import "./styles.scss";
import { Link } from "react-router-dom";
import "./CoolCarousel.scss"

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function RecipeCard(props) {

  return (
    <div className="out" key={props.id}>
      <div className="card">
        <img className="rounded-circle" alt={"users here"} src={props.image} height={156} width={156} />
        <div className="card-body">
          <h5 className="card-title">{props.label}</h5>
          <br />
          <Link to={`/recipe/${props.label}`}>
            <button className="btn btn-sm follow btn-primary">Select</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;