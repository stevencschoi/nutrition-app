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

// Renders the nutritional data of the chosen ingredient
function IngredientGraph(props) {
  // Recharts function for bar graph
  const makeGraph = (nutData) => {
    let fat = nutData.totalNutrients.FAT
      ? +(nutData.totalNutrients.FAT.quantity).toFixed(2)
      : "N/A";
    let carbohydrates = nutData.totalNutrients.CHOCDF
      ? +(nutData.totalNutrients.CHOCDF.quantity).toFixed(2)
      : "N/A";
    let protein = nutData.totalNutrients.PROCNT
      ? +(nutData.totalNutrients.PROCNT.quantity).toFixed(2)
      : "N/A";
    let cholesterol = nutData.totalNutrients.CHOLE
      ? +(nutData.totalNutrients.CHOLE.quantity).toFixed(2)
      : "N/A";
    let sodium = nutData.totalNutrients.NA
      ? +(nutData.totalNutrients.NA.quantity).toFixed(2)
      : "N/A";
    let sugar = nutData.totalNutrients.SUGAR
      ? +(nutData.totalNutrients.SUGAR.quantity).toFixed(2)
      : "N/A";
    let fibre = nutData.totalNutrients.FIBTG
      ? +(nutData.totalNutrients.FIBTG.quantity).toFixed(2)
      : "N/A";
    let calories = nutData.totalNutrients.ENERC_KCAL
      ? +(nutData.totalNutrients.ENERC_KCAL.quantity).toFixed(2)
      : "N/A";
    const data = [
      {
        name: "Fat",
        "grams / 100 grams": fat,
        fill: "#000000",
      },
      {
        name: "Carbohydrates",
        "grams / 100 grams": carbohydrates,
        fill: "#FFC658",
      },
      {
        name: "Protein",
        "grams / 100 grams": protein,
        fill: "#00A86B",
      },
      {
        name: "Sugar",
        "grams / 100 grams": sugar,
        fill: "#BEBEBE",
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
        fill: "#003366", 
      },
      {
        name: "Sodium",
        "milligrams / 100 grams": sodium,
        fill: "#FF6600", 
      },
    ];
    const data3 = [
      {
        name: "Calories",
        "calories / 100 grams": calories,
        fill: "#0C71E0",
      },
    ];
    return (
      // responsive containers need a parent container to set dimensions
      <div class="ingredient-graph-container">
        <div class="left-graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "grams / 100 grams",
                  dx: -20,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip wrapperStyle={{ zIndex: 420 }} />
              <Bar dataKey="grams / 100 grams" />
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
                  value: "milligrams / 100 grams",
                  dx: -20,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip
                position={{ x: 25 }}
                wrapperStyle={{ zIndex: 420 }}
              />
              <Bar dataKey="milligrams / 100 grams" />
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
                  value: "calories / 100 grams",
                  dx: -25,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip
                position={{ x: -40 }}
                wrapperStyle={{ zIndex: 420 }}
              />
              <Bar dataKey="calories / 100 grams" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  return (
    <div class="ingredient-data">
      <h2>
        Select Nutritional Data of{" "}
        {props.data && props.data.ingredients[0].parsed[0].food}
      </h2>
      {props.data && makeGraph(props.data)}
    </div>
  );
}
export default IngredientGraph;
