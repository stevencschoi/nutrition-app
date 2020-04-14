import React, { useState, useEffect, Fragment, PureComponent } from "react";
import "./styles.scss"; 
import { Redirect } from "react-router";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Renders the nutritional data of the chosen ingredient
function IngredientGraph(props) {

  // Recharts function for bar graph
  const makeGraph = (nutData) => {

    let fat = nutData.totalNutrients.FAT.quantity
    let carbohydrates = nutData.totalNutrients.CHOCDF.quantity
    let protein = nutData.totalNutrients.PROCNT.quantity
    let cholesterol = nutData.totalNutrients.CHOLE.quantity
    let sodium = nutData.totalNutrients.NA.quantity
    let sugar = nutData.totalNutrients.SUGAR.quantity
    let fibre = nutData.totalNutrients.FIBTG.quantity

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
      <h1>Nutritional data per 100 grams of:</h1>
      <h2>{props.data && props.data.ingredients[0].parsed[0].food}</h2>
      <h3>Calories: {props.data && props.data.totalNutrients.ENERC_KCAL.quantity}</h3>
      {props.data && makeGraph(props.data)}
    </div>
  );
} 

export default IngredientGraph;