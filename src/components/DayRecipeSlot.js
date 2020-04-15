import React from "react";

export default function DayRecipeSlot(props) {
  // useEffect(() => {
  //   console.log("eachitem", props);
  // });

  return (
    <>
      {props.name && (
        <div>
          <h1>{props.name}</h1>
          <p>The image url is{props.image}</p>
          <h3>The url is this {props.url}</h3>
        </div>
      )}
      {!props.name && <button>Add</button>}
    </>
  );
}

// name
// image
// url

// { // if props, show recipe image and title
//   props ?
//   <div>
//     <h2>{props.name}</h2>
//     <img src={props.image} />
//     <button onClick={editSlot}>Edit Recipe</button>
//   </div> : <div>
//     <button onClick={editSlot}>Add Recipe</button>
//     <button onClick={addSlot}>Add Meal Slot</button>
//   </div>
// }
