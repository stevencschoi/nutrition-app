import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss";
import { Redirect } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
        "grams / serving": fat,
        fill: "#83a6ed",
      },
      {
        name: "Carbohydrates",
        "grams / serving": carbohydrates,
        fill: "#8dd1e1",
      },
      {
        name: "Protein",
        "grams / serving": protein,
        fill: "#82ca9d",
      },
      {
        name: "Sugar",
        "grams / serving": sugar,
        fill: "#ffc658",
      },
      {
        name: "Fibre",
        "grams / serving": fibre,
        fill: "#8C564B",
      },
    ];
    const data2 = [
      {
        name: "Cholesterol",
        "milligrams / serving": cholesterol,
        fill: "#a4de6c",
      },
      {
        name: "Sodium",
        "milligrams / serving": sodium,
        fill: "#d0ed57",
      },
    ];
    return (
      // responsive containers need a parent container to set dimensions
      <div class="ingredient-and-recipe-graph-container">
        <ResponsiveContainer width="55%" height="100%">
          <BarChart width={500} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: 'grams / serving',
                dx: -15,
                angle: -90,
                position: 'center',
              }}
              type="number" />
            <Tooltip />
            <Bar dataKey="grams / serving" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="20%" height="100%">
          <BarChart width={240} height={200} data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: 'milligrams / serving',
                dx: -30,
                angle: -90,
                position: 'center',
              }}
              type="number"
            />
            <Tooltip />
            <Bar dataKey="milligrams / serving" />
          </BarChart>
        </ResponsiveContainer>
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