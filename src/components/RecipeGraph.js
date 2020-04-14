import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss"; 
import { Redirect } from "react-router";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function RecipeGraph(props) {
  
  const makeGraph = (nutData) => {

    let fat = nutData.hits[0].recipe.totalNutrients.FAT.quantity
    let carbohydrates = nutData.hits[0].recipe.totalNutrients.CHOCDF.quantity
    let protein = nutData.hits[0].recipe.totalNutrients.PROCNT.quantity
    let cholesterol = nutData.hits[0].recipe.totalNutrients.CHOLE.quantity
    let sodium = nutData.hits[0].recipe.totalNutrients.NA.quantity
    let sugar = nutData.hits[0].recipe.totalNutrients.SUGAR.quantity
    let fibre = nutData.hits[0].recipe.totalNutrients.FIBTG.quantity

    const data = [
      {
        "name": "Fat",
        "grams": fat,
        "fill": "#83a6ed"
      },
      {
        "name": "Carbohydrates",
        "grams": carbohydrates,
        "fill": "#8dd1e1"
      },
      {
        "name": "Protein",
        "grams": protein,
        "fill": "#82ca9d"
      },
      {
        "name": "Cholesterol",
        "grams": cholesterol / 1000,
        "fill": "#a4de6c"
      },
      {
        "name": "Sodium",
        "grams": sodium / 1000,
        "fill": "#d0ed57"
      },
      {
        "name": "Sugar",
        "grams": sugar,
        "fill": "#ffc658"
      },
      {
        "name": "Fibre",
        "grams": fibre,
        "fill": "#8C564B"
      },
    ];

    return (
      <BarChart
        width={800}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="grams" />
      </BarChart>
    );
  };

  return (
  <div>
    <h1>Graph</h1>
    <p>
        
    </p>
      {props.foodIngredient && makeGraph(props.foodIngredient)}
  </div>
  );
} 
export default RecipeGraph;