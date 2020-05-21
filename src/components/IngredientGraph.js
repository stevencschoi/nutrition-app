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
    // set default to N/A in case Edamam has missing data
    let fat = "N/A";
    let carbohydrates = "N/A";
    let protein = "N/A";
    let cholesterol = "N/A";
    let sodium = "N/A";
    let sugar = "N/A";
    let fibre = "N/A";
    if (nutData.totalNutrients.FAT) {
      fat = nutData.totalNutrients.FAT.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.CHOCDF) {
      carbohydrates = nutData.totalNutrients.CHOCDF.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.PROCNT) {
      protein = nutData.totalNutrients.PROCNT.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.CHOLE) {
      cholesterol = nutData.totalNutrients.CHOLE.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.NA) {
      sodium = nutData.totalNutrients.NA.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.SUGAR) {
      sugar = nutData.totalNutrients.SUGAR.quantity.toFixed(2)
    };
    if (nutData.totalNutrients.FIBTG) {
      fibre = nutData.totalNutrients.FIBTG.quantity.toFixed(2)
    };
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
                  dx: -5,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip />
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
                  dx: -15,
                  angle: -90,
                  position: "center",
                }}
                type="number"
              />
              <Tooltip />
              <Bar dataKey="milligrams / 100 grams" />
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
