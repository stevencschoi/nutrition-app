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
  const makeGraph = (
    calories,
    fat_in_g,
    carbs_in_g,
    protein_in_g,
    sugar_in_g,
    fiber_in_g,
    cholesterol_in_mg,
    sodium_in_mg,
  ) => {
    let fat = parseFloat(fat_in_g);
    let carbohydrates = parseFloat(carbs_in_g);
    let protein = parseFloat(protein_in_g);
    let cholesterol = parseFloat(cholesterol_in_mg);
    let sodium = parseFloat(sodium_in_mg);
    let sugar = parseFloat(sugar_in_g);
    let fibre = parseFloat(fiber_in_g);
    let caloriesPerServing = parseFloat(calories);
    const data = [
      {
        name: "Fat",
        "grams / serving": fat,
        fill: "#000000",
      },
      {
        name: "Carbohydrates",
        "grams / serving": carbohydrates,
        fill: "#FFC658",
      },
      {
        name: "Protein",
        "grams / serving": protein,
        fill: "#00A86B",
      },
      {
        name: "Sugar",
        "grams / serving": sugar,
        fill: "#BEBEBE",
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
        fill: "#003366", 
      },
      {
        name: "Sodium",
        "milligrams / serving": sodium,
        fill: "#FF6600", 
      },
    ];
    const data3 = [
      {
        name: "Calories",
        "calories / serving": caloriesPerServing,
        fill: "#0C71E0",
      },
    ];
    return (
      // favourites graphs
      <div class="favourite-graph-container">
        <div class="left-graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "grams / serving",
                  dx: -25,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip wrapperStyle={{ zIndex: 420 }} />
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
                  dx: -25,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip 
                position={{ x: 25 }} 
                wrapperStyle={{ zIndex: 420 }} 
              />
              <Bar dataKey="milligrams / serving" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div class="calories-graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={240} height={300} data={data3}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "calories / serving",
                  dx: -25,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip 
                position={{ x: -60 }} 
                wrapperStyle={{ zIndex: 420 }} 
              />
              <Bar dataKey="calories / serving" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  return (
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
        props.image_url,
        props.recipe_yield
      )}
    </div>
  );
}
export default RecipeGraph;
