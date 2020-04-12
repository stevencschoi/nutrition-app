import React, { useState, useEffect, Fragment, PureComponent } from "react";
import "./styles.css"; 
import { Redirect } from "react-router";

import { RadialBarChart, RadialBar, Legend } from 'recharts';

function IngredientGraph(props) {
  const [data, setData] = useState()
  // let x = props
  // console.log("this is x", x)
  // let y = props.data
  // console.log("this is y", y)
  // let z = props.data.totalNutrients
  // console.log("this is z", z)
  // let a = props.data.totalNutrients.ENERC_KCAL
  // console.log("this is a", a)
  // let b = props.data.totalNutrients.ENERC_KCAL.quantity
  // console.log("this is b", b)
  
  // if (props.data) {

  // } 
  const makeGraph = (nutData) => {

    let calories = nutData.totalNutrients.ENERC_KCAL.quantity
    let fat = nutData.totalNutrients.FAT.quantity

    const data = [
      {
        "name": "Calories",
        "quantity": calories,
        "fill": "#8884d8"
      },
      {
        "name": "Fat",
        "quantity": fat,
        "fill": "#83a6ed"
      }
    ]
    // setData(data)
    return (
      <RadialBarChart
        width={730}
        height={250}
        innerRadius="10%"
        outerRadius="80%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='quantity' />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
      </RadialBarChart>
    )
  }


  // const obj = props.data

  // useEffect(() => {

  // }, [props.data]);
  
  return (
  <div>
    
    <h1>HI</h1>
    <p>
        {props.data && props.data.totalNutrients.FAT.quantity}
        {props.data && props.data.totalNutrients.ENERC_KCAL.quantity}
        {/* {props.data.totalNutrients.FAT.quantity} */}
        {/* {props.data} */}
    </p>
    <div>
        {props.data && makeGraph(props.data)}
    </div>





  </div>
  );
} 
export default IngredientGraph;