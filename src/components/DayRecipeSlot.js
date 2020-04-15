import React from "react";

export default function DayRecipeSlot(props) {
  return(
    { // if props, show recipe image and title
      props ? 
      <div>
        <h2>{props.name}</h2>
        <img src={props.image} />
        <button onClick={editSlot}>Edit Recipe</button>
      </div> : <div>
        <button onClick={editSlot}>Add Recipe</button>
        <button onClick={addSlot}>Add Meal Slot</button>
      </div>
    }
  )
}