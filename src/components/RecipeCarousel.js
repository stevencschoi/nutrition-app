import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// const ReactDOM = require("react-dom");
import { Carousel } from "react-responsive-carousel";

//   {
//     id: 564753,
//     title: "Mushroom Vepudu – Mushroom Fry | Easy Mushroom s",
//     readyInMinutes: 35,
//     servings: 4,
//     image: "Mushroom-Vepudu--Mushroom-Fry---Easy-Mushroom-s-564753.jpg",
//     imageUrls: ["Mushroom-Vepudu--Mushroom-Fry---Easy-Mushroom-s-564753.jpg"],
//   }

export default function RecipeCarousel(props) {
  // for each object in recipes array, return a div containing the recipe image and title and id
  // const recipeCards = props.recipes.map((recipe) => {
  //   const url = `https://spoonacular.com/recipeImages/` + `${recipe.image}`;
  //   return (
  //     <div id={recipe.id}>
  //       <a>
  //         <img src={url} />
  //         <h4 className="legend">{recipe.title}</h4>
  //       </a>
  //     </div>
  //   );
  // });

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
        <div id="8">
          <img src="../../public/assets/najib.jpg" />
          <h4 className="legend">Pervert</h4>
        </div>
        <div id="9">
          <img src="../../public/assets/najib.jpg" />
          <h4 className="legend">Pervert</h4>
        </div>
      </Carousel>
    </div>
  );
}

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
