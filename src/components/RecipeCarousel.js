import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./recipe-carousel.css";
const ReactDOM = require("react-dom");

export default function RecipeCarousel(props) {
  return (
    <div class="carousel-wrapper">
      <Carousel showArrows={true} useKeyboardArrows={true} infiniteLoop>
        {props.recipes}
      </Carousel>
    </div>
  );
}
