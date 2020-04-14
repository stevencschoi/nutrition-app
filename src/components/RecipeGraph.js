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
          <p class="graph-label">per serving</p>
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
          </BarChart>        
          </div>        
          <div class="graph">
          <p class="graph-label">per serving</p>
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
    <div>
      {props.foodIngredient && makeGraph(props.foodIngredient)}
    </div>
  );
} 
export default RecipeGraph;