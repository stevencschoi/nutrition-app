import React, { useEffect } from "react";
import "./styles.scss";
import Recipeitem from "./Recipeitem"

export default function RecipeIngredient(props) {

  useEffect(() => {

  }, [props]);

  const renderIngredients = (ingredients) => {
    const arr = ingredients.hits[0].recipe.ingredientLines
    const lineItems = arr.map((item) => {
      // <Recipeitem item={item}/>
      return (<Recipeitem item={item}/>)
    })
    return(lineItems)
  }

  return (
    <>
    <h2>Ingredient</h2>
    <div>
      <ul>
      {props.foodIngredient && renderIngredients(props.foodIngredient)}
      </ul>
    </div>
  </>
  );
}
