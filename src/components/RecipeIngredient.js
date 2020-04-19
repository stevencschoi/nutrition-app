import React, { useEffect } from "react";
import "./styles.scss";
import Recipeitem from "./Recipeitem";

export default function RecipeIngredient(props) {
  useEffect(() => { }, [props]);

  return (
    <>
      <h2>Ingredients</h2>
      <div>
        <ul>
          {props.foodIngredient && props.foodIngredient.hits[0].recipe.ingredientLines.map(item => {
            return (
              <li>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}
// import React, { useEffect } from "react";
// import "./styles.scss";
// import Recipeitem from "./Recipeitem";

// export default function RecipeIngredient(props) {
//   useEffect(() => { }, [props]);

//   const renderIngredients = (ingredients) => {
//     const arr = ingredients.hits[0].recipe.ingredientLines;
//     const lineItems = arr.map((item) => {
//       return (
//         <li>
//           {item}
//         </li>
//       );
//     });
//     return lineItems;
//   };

//   return (
//     <>
//       <h2>Ingredients</h2>
//       <div>
//         <ul>
//           {props.foodIngredient && renderIngredients(props.foodIngredient)}
//         </ul>
//       </div>
//     </>
//   );
// }
