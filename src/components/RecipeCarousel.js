import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// const ReactDOM = require("react-dom");

export default function RecipeCarousel(props) {
  return (
    <div class="carousel-wrapper">
      <Carousel
        showArrows={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div id="7">
          <img src="https://i.ytimg.com/vi/OFjlF7zQF_g/maxresdefault.jpg" />
          <h4 className="legend">Cat</h4>
        </div>
      </Carousel>
    </div>
  );
}

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
