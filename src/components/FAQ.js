import React from "react";
import "./styles.scss";
import searchScreen from '../assets/search.png';
import ingredientScreen from '../assets/ingredient.png';
import recipeScreen from '../assets/recipe.png';
import favouritesScreen from '../assets/favourites.png';
import scheduleScreen from '../assets/schedule.png';
import dataScreen from '../assets/data.png';
import { Link } from "react-router-dom";

function FAQ() {

  return (
    <div className="faq">
      <h1 className="favourite-title">Frequently Asked Questions</h1>
      <h2>Who created VegTable?</h2>
      <h3>VegTable was created by
        <a href="https://github.com/stevencschoi/"> Steven Choi</a>,
        <a href="https://github.com/Pulse6/"> Marco Siu</a>, and
        <a href="https://github.com/victorcwyu/"> Victor Yu</a>.
        <br></br>
        The source code deployed onto Heroku can be found 
        <a href="https://github.com/victorcwyu/VegTable"> here </a>
        and the original code repositories can be found 
        <a href="https://github.com/stevencschoi/nutrition-app"> here </a> 
        and <a href="https://github.com/stevencschoi/nutrition-app-server" >here</a>.
      </h3>
      <h2>What is VegTable?</h2>
      <h3>
        VegTable is an analytics driven meal-planning application built with 
        React that allows users to schedule meals and track their nutritional 
        intake using data retrieved from the Edamam API.  Graphs are rendered 
        with Recharts and Socket IO is utilized to observe real-time changes 
        to graph data.
      </h3>
      <h2>How do I get started?</h2>
      <h3>
        Without registration, you can enter an ingredient in the searchbar,
      </h3>
      <br></br>
      < img src={searchScreen} />
      <br></br>
      <br></br>
      <br></br>
      <h3>
         and retrieve the nutritional information for that ingredient and recipes
         utilizing that ingredient.
      </h3>
      <br></br>
      < img src={ingredientScreen} />
      <br></br>
      <br></br>
      <br></br>
      <h3>
        Clicking on a recipe will display the nutritional information for the recipe.
      </h3>
      <br></br>
      < img src={recipeScreen} />
      <br></br>
      <br></br>
      <br></br>
      <h3>
        If you register, you will be able to add recipes to a list of favourites.
      </h3>
      <br></br>
      < img src={favouritesScreen} />
      <br></br>
      <br></br>
      <br></br>
      <h3>
        You also gain the ability to add recipes to a meal 
        plan schedule. 
      </h3>
      <br></br>
      < img src={scheduleScreen} />
      <br></br>
      <br></br>
      <br></br>
      <h3>
        Finally, you will be able to track 
        your nutritional intake.  You can also follow other people using
        VegTable to compare your nutritional intake.
      </h3>
      <br></br>
      < img src={dataScreen} />
    </div>
  );
}

export default FAQ;