import React, { useState, useEffect, Fragment, PureComponent } from "react";
import "./styles.css"; 
import { Redirect } from "react-router";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts';

function IngredientGraph(props) {

  const makeGraph = (nutData) => {

    let fat = nutData.totalNutrients.FAT.quantity
    let carbohydrates = nutData.totalNutrients.CHOCDF.quantity
    let protein = nutData.totalNutrients.PROCNT.quantity
    let cholesterol = nutData.totalNutrients.CHOLE.quantity
    let sodium = nutData.totalNutrients.NA.quantity
    let sugar = nutData.totalNutrients.SUGAR.quantity
    let fibre = nutData.totalNutrients.FIBTG.quantity
    let water = nutData.totalNutrients.WATER.quantity

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
      {
        "name": "Water",
        "grams": water,
        "fill": "#82ca9d"
      }
    ];

    return (
      <BarChart
        width={800}
        height={300}
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

  const makeVitDGraph = (nutData) => {

    let vitD = nutData.totalNutrients.VITD.quantity

    const data = [
      {
        "name": "Vitamin D",
        "International Units": vitD,
        "fill": "#ffc658"
      }
    ];

    return (
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="International Units" />
      </BarChart>
    );
  };

  const makeSecondaryGraph = (nutData) => {

    let magnesium = nutData.totalNutrients.MG.quantity
    let potassium = nutData.totalNutrients.K.quantity
    let iron = nutData.totalNutrients.FE.quantity
    let zinc = nutData.totalNutrients.ZN.quantity
    let phosphorus = nutData.totalNutrients.P.quantity
    let vitC = nutData.totalNutrients.VITC.quantity
    let thiamine = nutData.totalNutrients.THIA.quantity
    let riboflavin = nutData.totalNutrients.RIBF.quantity
    let niacin = nutData.totalNutrients.NIA.quantity
    let vitB6 = nutData.totalNutrients.VITB6A.quantity
    let vitE = nutData.totalNutrients.TOCPHA.quantity

    const data = [
      {
        "name": "Magnesium",
        "milligrams": magnesium,
        "fill": "#83a6ed"
      },
      {
        "name": "Potassium",
        "milligrams": potassium,
        "fill": "#8dd1e1"
      },
      {
        "name": "Iron",
        "milligrams": iron,
        "fill": "#82ca9d"
      },
      {
        "name": "Zinc",
        "milligrams": zinc,
        "fill": "#a4de6c"
      },
      {
        "name": "Phosphorus",
        "milligrams": phosphorus,
        "fill": "#d0ed57"
      },
      {
        "name": "Vitamin C",
        "milligrams": vitC,
        "fill": "#ffc658"
      },
      {
        "name": "Thiamine",
        "milligrams": thiamine,
        "fill": "#ffc658"
      },
      {
        "name": "Riboflavin",
        "milligrams": riboflavin,
        "fill": "#83a6ed"
      },
      {
        "name": "Niacin",
        "milligrams": niacin,
        "fill": "#8dd1e1"
      },
      {
        "name": "Vitamin B6",
        "milligrams": vitB6,
        "fill": "#82ca9d"
      },
      {
        "name": "Vitamin E",
        "milligrams": vitE,
        "fill": "#83a6ed"
      }
    ];

    return (
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="milligrams" />
      </BarChart>
    );
  };

  const makeThirdGraph = (nutData) => {

    let vitA = nutData.totalNutrients.VITA_RAE.quantity
    let folateTotal = nutData.totalNutrients.FOLDFE.quantity
    let folate = nutData.totalNutrients.FOLFD.quantity
    let folicAcid = nutData.totalNutrients.FOLAC.quantity
    let vitB12 = nutData.totalNutrients.VITB12.quantity
    let vitK = nutData.totalNutrients.VITK1.quantity

    const data = [
      {
        "name": "Vitamin A",
        "micrograms": vitA,
        "fill": "#ffc658"
      },
      {
        "name": "Folate (total)",
        "micrograms": folateTotal,
        "fill": "#a4de6c"
      },
      {
        "name": "Folate",
        "micrograms": folate,
        "fill": "#d0ed57"
      },
      {
        "name": "Folic Acid",
        "micrograms": folicAcid,
        "fill": "#ffc658"
      },
      {
        "name": "Vitamin B12",
        "micrograms": vitB12,
        "fill": "#ffc658"
      },
      {
        "name": "Vitamin K",
        "micrograms": vitK,
        "fill": "#8dd1e1"
      },
    ];

    return (
      <BarChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="micrograms" />
      </BarChart>
    );
  };

  return (
    <div>
      <h1>Nutritional data per 100 grams of:</h1>
      <h2>{props.data && props.data.ingredients[0].parsed[0].food}</h2>
      <h3>Calories:</h3>
      <h3>{props.data && props.data.totalNutrients.ENERC_KCAL.quantity}</h3>
      
      {props.data && makeGraph(props.data)}
      {props.data && makeVitDGraph(props.data)}
      {props.data && makeSecondaryGraph(props.data)}
      {props.data && makeThirdGraph(props.data)}
    </div>
  );
} 
export default IngredientGraph;