// import React, { useState } from "react";
// import "./styles.scss";
// import axios from "axios";
// import FavouritesItemGraph from "./FavouritesItemGraph";
// import MealCalendar from "./MealCalendar";
// import Button from "./Button";
// import { Dropdown } from "semantic-ui-react";
// import { socket } from "../hooks/useApplicationData";

// const FavouritesItem1 = (props) => {
//   const [date, setDate] = useState(null);
//   const [meal, setMeal] = useState(null);

//   const deleteFav = () => {
//     const id = props.id;

//     axios
//       .post("/favourites/delete", { recipeId: id })
//       .then((result) => {
//         props.setUpdateItem(id);
//       })
//       .catch((error) => console.error(error));
//   };

//   // add a recipe to a given day
//   const addRecipeToDay = (id, date, meal) => {
//     const formatdate = JSON.stringify(date).slice(1, 11);
//     const recipeId = id;

//     axios
//       .post("/day/add", {
//         date: `${formatdate}`,
//         recipeId: `${recipeId}`,
//         mealNumber: `${meal}`,
//       })
//       .then((result) => {
//         socket.emit("new", (data) => {
//           console.log("Socket sending from addrecipe", data);
//         });
//         setDate(null);
//       })
//       .catch((error) => console.error(error));
//   };

//   const options = [
//     { key: 1, text: "Breakfast", value: "1" },
//     { key: 2, text: "Lunch", value: "2" },
//     { key: 3, text: "Dinner", value: "3" },
//     { key: 4, text: "Other", value: "4" },
//   ];

//   return (
//     <>
//       <div className="FavouritesItem">
//         <div className="favourite-main">
//           <div className="image-and-drop-container">
//             <div className="image-container">
//               <a href={`/recipe/${props.name}`}>
//                 <img src={props.image_url} />
//               </a>
//               {props.id && (
//                 <Button
//                   deleteImage
//                   onClick={() => {
//                     deleteFav();
//                   }}
//                 >
//                   <i class="far fa-trash-alt"></i>
//                 </Button>
//               )}
//             </div>
//           </div>
//             <FavouritesItemGraph
//               calories={props.calories}
//               fat_in_g={props.fat_in_g}
//               carbs_in_g={props.carbs_in_g}
//               protein_in_g={props.protein_in_g}
//               sugar_in_g={props.sugar_in_g}
//               fiber_in_g={props.fiber_in_g}
//               cholesterol_in_mg={props.cholesterol_in_mg}
//               sodium_in_mg={props.sodium_in_mg}
//               image_url={props.image_url}
//               name={props.name}
//               recipe_yield={props.recipe_yield}
//             />
//         </div>
//         <div className="meal-plan-container">
//           <div className="plan-title">
//             <h3>
//               <i class="far fa-calendar-alt"></i> Add to Your Meal Plan
//             </h3>
//           </div>
//           <div className="dropdown-container">
//             <div className="selectContainer">
//               <div className="selectPosition">
//                 <MealCalendar
//                   date={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//                 <div>
//                   {date && (
//                     <Dropdown
//                       options={options}
//                       selection
//                       onChange={(e, { value }) => setMeal(value)}
//                     />
//                   )}
//                 </div>
//                 {date && meal && (
//                   <div className="fav-button-container">
//                     <div className="add">
//                       <Button
//                         onClick={() => {
//                           addRecipeToDay(props.id, date, meal);
//                           setMeal(null);
//                         }}
//                       >
//                         Add
//                       </Button>
//                     </div>
//                     <div>
//                       <Button
//                         delete
//                         onClick={() => {
//                           setDate(null);
//                           setMeal(null);
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FavouritesItem1;










import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import FavouritesItemGraph from "./FavouritesItemGraph";
import MealCalendar from "./MealCalendar";
import Button from "./Button";
import { socket } from "../hooks/useApplicationData";

const FavouritesItem1 = (props) => {
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState(null);

  const deleteFav = () => {
    const id = props.id;

    axios
      .post("/favourites/delete", { recipeId: id })
      .then((result) => {
        props.setUpdateItem(id);
      })
      .catch((error) => console.error(error));
  };

  // add a recipe to a given day
  const addRecipeToDay = (id, date, meal) => {
    const formatdate = JSON.stringify(date).slice(1, 11);
    const recipeId = id;

    axios
      .post("/day/add", {
        date: `${formatdate}`,
        recipeId: `${recipeId}`,
      })
      .then((result) => {
        socket.emit("new", (data) => {
          console.log("Socket sending from addrecipe", data);
        });
        setDate(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="FavouritesItem">
        {/* <div className="including-link"> */}
        <div className="favourite-main">
          <div className="image-and-drop-container">
            <div className="image-container">
              <a href={`/recipe/${props.name}`}>
                <img src={props.image_url} />
              </a>
              {props.id && (
                <Button
                  deleteImage
                  onClick={() => {
                    deleteFav();
                  }}
                >
                  <i class="far fa-trash-alt"></i>
                </Button>
              )}
            </div>
            <div class="ingredient-data">
              <h2>Select Nutritional Data of {props.name}</h2>
              <FavouritesItemGraph
                calories={props.calories}
                fat_in_g={props.fat_in_g}
                carbs_in_g={props.carbs_in_g}
                protein_in_g={props.protein_in_g}
                sugar_in_g={props.sugar_in_g}
                fiber_in_g={props.fiber_in_g}
                cholesterol_in_mg={props.cholesterol_in_mg}
                sodium_in_mg={props.sodium_in_mg}
                image_url={props.image_url}
                name={props.name}
                recipe_yield={props.recipe_yield}
              />
            </div>
          </div>
        </div> 
        <div className="meal-plan-container">
          <div className="plan-title">
            <h3>
              <i class="far fa-calendar-alt"></i> Add to Your Meal Plan
            </h3>
          </div>
          <div className="dropdown-container">
            <div className="selectContainer">
              <div className="selectPosition">
                <MealCalendar
                  date={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    setMeal("yum")
                  }}
                />
                {date && meal && (
                  <div className="fav-button-container">
                    <div className="add">
                      <Button
                        onClick={() => {
                          addRecipeToDay(props.id, date);
                          setMeal(null);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="delete">
                      <Button
                        delete
                        onClick={() => {
                          setDate(null);
                          setMeal(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default FavouritesItem1;
