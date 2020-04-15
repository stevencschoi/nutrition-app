import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function CoolCarouselItem(props) {
  return (
    <Link to={`/recipe/${props.label}`}>
      <div>
        <img className="rounded-circle" src={props.image} />
        <h4 className="legend">{props.label}</h4>
      </div>
    </Link>
  );
}

export default CoolCarouselItem;
