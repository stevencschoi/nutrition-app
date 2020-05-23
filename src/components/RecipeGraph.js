import React from "react";
import "./styles.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RecipeGraph(props) {
  const makeGraph = (nutData) => {
    let serve_yield = nutData.hits[0].recipe.yield;
    let fat = nutData.hits[0].recipe.totalNutrients.FAT
      ? +(nutData.hits[0].recipe.totalNutrients.FAT.quantity / serve_yield).toFixed(2)
      : "N/A";
    let carbohydrates = nutData.hits[0].recipe.totalNutrients.CHOCDF
      ? +(nutData.hits[0].recipe.totalNutrients.CHOCDF.quantity / serve_yield).toFixed(2)
      : "N/A";
    let protein = nutData.hits[0].recipe.totalNutrients.PROCNT
      ? +(nutData.hits[0].recipe.totalNutrients.PROCNT.quantity / serve_yield).toFixed(2)
      : "N/A";
    let cholesterol = nutData.hits[0].recipe.totalNutrients.CHOLE
      ? +(nutData.hits[0].recipe.totalNutrients.CHOLE.quantity / serve_yield).toFixed(2)
      : "N/A";
    let sodium = nutData.hits[0].recipe.totalNutrients.NA
      ? +(nutData.hits[0].recipe.totalNutrients.NA.quantity / serve_yield).toFixed(2)
      : "N/A";
    let sugar = nutData.hits[0].recipe.totalNutrients.SUGAR
      ? +(nutData.hits[0].recipe.totalNutrients.SUGAR.quantity / serve_yield).toFixed(2)
      : "N/A";
    let fibre = nutData.hits[0].recipe.totalNutrients.FIBTG
      ? +(nutData.hits[0].recipe.totalNutrients.FIBTG.quantity / serve_yield).toFixed(2)
      : "N/A";
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
      // recipe graphs
      <div class="ingredient-graph-container">
        <div class="left-graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "grams / serving",
                  dx: -20,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip />
              <Bar dataKey="grams / serving" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div class="right-graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={240} height={300} data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "milligrams / serving",
                  dx: -20,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip />
              <Bar dataKey="milligrams / serving" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  return <div>{props.foodIngredient && makeGraph(props.foodIngredient)}</div>;
}
export default RecipeGraph;
