import React, { useState, useEffect, Fragment } from "react";
import "./styles.css"; 
import { Redirect } from "react-router";

function IngredientGraph(props) {
  
  // const obj = props.data

  useEffect(() => {
    console.log("This one", props)
    // const data = props.getRecipe()
    // setData(data)
    // console.log(data)
  }, [props.data]);
  
  return (
  <div>
    <h1>HI</h1>
    <p>
        {props.data && props.data.totalNutrients.FAT.quantity}
    </p>
  </div>
  );
} 
export default IngredientGraph;