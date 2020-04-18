import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./CoolCarousel.scss";

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function RecipeCard(props) {
  return (
    <div className="out" key={props.id}>
      <div className="card">
        <img
          className="rounded-circle"
          alt={"users here"}
          src={props.image}
          height={156}
          width={156}
        />
        <div className="card-body">
          <h5 className="card-title">{props.label}</h5>
          <br />
          {props.url && (
            <Link to={`/recipe/${props.label}`}>
              <Button default>View Details</Button>
            </Link>
          )}
          {props.follow && (
            <Button default onClick={props.follow}>
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
