import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss";
import { Redirect } from "react-router";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
function RecipeGraph(props) {
  const makeGraph = (
    calories,
    fat_in_g,
    carbs_in_g,
    protein_in_g,
    sugar_in_g,
    fiber_in_g,
    cholesterol_in_mg,
    sodium_in_mg,
    image_url
  ) => {
    let fat = fat_in_g;
    let carbohydrates = carbs_in_g;
    let protein = protein_in_g;
    let cholesterol = cholesterol_in_mg;
    let sodium = sodium_in_mg;
    let sugar = sugar_in_g;
    let fibre = fiber_in_g;
    const data = [
      {
        name: "Fat",
        "grams / 100 grams": fat,
        fill: "#83a6ed",
      },
      {
        name: "Carbohydrates",
        "grams / 100 grams": carbohydrates,
        fill: "#8dd1e1",
      },
      {
        name: "Protein",
        "grams / 100 grams": protein,
        fill: "#82ca9d",
      },
      {
        name: "Sugar",
        "grams / 100 grams": sugar,
        fill: "#ffc658",
      },
      {
        name: "Fibre",
        "grams / 100 grams": fibre,
        fill: "#8C564B",
      },
    ];
    const data2 = [
      {
        name: "Cholesterol",
        "milligrams / 100 grams": cholesterol,
        fill: "#a4de6c",
      },
      {
        name: "Sodium",
        "milligrams / 100 grams": sodium,
        fill: "#d0ed57",
      },
    ];
    return (
      <div class="graph-container">
        <div class="graph">
          <p class="graph-label">per serving</p>
          <BarChart width={500} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontFamily: 'Londrina Solid', fill: '#123050' }} />
            <YAxis style={{ fontFamily: 'Londrina Solid', fill: '#123050' }} />
            <Tooltip />
            <Bar dataKey="grams / 100 grams" />
          </BarChart>
        </div>
        <div class="graph">
          <p class="graph-label">per serving</p>
          <BarChart width={240} height={200} data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontFamily: 'Londrina Solid', fill: '#123050' }} />
            <YAxis style={{ fontFamily: 'Londrina Solid', fill: '#123050' }} />
            <Tooltip />
            <Bar dataKey="milligrams / 100 grams" />
          </BarChart>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div class="nutritional-data">
      <h2>
        Select Nutritional Data of {props.name}
      </h2>
      <div>
        {makeGraph(
          props.calories,
          props.fat_in_g,
          props.carbs_in_g,
          props.protein_in_g,
          props.sugar_in_g,
          props.fiber_in_g,
          props.cholesterol_in_mg,
          props.sodium_in_mg,
          props.image_url
        )}
      </div>
    </div>
  );

}
export default RecipeGraph;