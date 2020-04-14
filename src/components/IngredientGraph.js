import React, { useState, useEffect, Fragment, PureComponent } from "react";
import "./styles.scss"; 
import { Redirect } from "react-router";import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';// Renders the nutritional data of the chosen ingredient

function IngredientGraph(props) {  // Recharts function for bar graph
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
        "grams / 100 grams": fat,
        "fill": "#83a6ed"
      },
      {
        "name": "Carbohydrates",
        "grams / 100 grams": carbohydrates,
        "fill": "#8dd1e1"
      }, 
      {
        "name": "Protein",
        "grams / 100 grams": protein,
        "fill": "#82ca9d"
      },
      {
        "name": "Sugar",
        "grams / 100 grams": sugar,
        "fill": "#ffc658"
      },
      {
        "name": "Fibre",
        "grams / 100 grams": fibre,
        "fill": "#8C564B"
      },
    ];    const data2 = [
      {
        "name": "Cholesterol",
        "milligrams / 100 grams": cholesterol,
        "fill": "#a4de6c"
      },
      {
        "name": "Sodium",
        "milligrams / 100 grams": sodium,
        "fill": "#d0ed57"
      },
    ];    return (
      <div class="graph-container">        
        <div class="graph">
          <p class="graph-label">grams / 100 grams of {props.data && props.data.ingredients[0].parsed[0].food}</p>
          <BarChart
            width={800}
            height={250}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="grams / 100 grams" />
          </BarChart>        </div>        <div class="graph">
          <p class="graph-label">milligrams / 100 grams of {props.data && props.data.ingredients[0].parsed[0].food}</p>
          <BarChart
            width={350}
            height={250}
            data={data2}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="milligrams / 100 grams" />
          </BarChart>        
        </div>
      </div>
    );
  };  return (
    <div class="nutritional-data">
      <h1>Select Nutritional Data of {props.data && props.data.ingredients[0].parsed[0].food}</h1>
      <br></br>
      <br></br>
      {props.data && makeGraph(props.data)}
    </div>
  );
} export default IngredientGraph;