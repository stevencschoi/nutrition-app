import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "./styles.scss";

function Searchbar(props) {
  const [ingredient, setIngredient] = useState("");

  const dietOptions = [
    { key: 1, text: "Balanced", value: "balanced" },
    { key: 2, text: "High-Fiber", value: "high-fiber" },
    { key: 3, text: "High-Protein", value: "high-protein" },
    { key: 4, text: "Low-Carb", value: "low-carb" },
    { key: 5, text: "Low-Fat", value: "low-fat" },
    { key: 6, text: "Low-Sodium", value: "low-sodium" },
  ];

  const restrictiveOptions = [
    { key: 1, text: "Alcohol-free", value: "alcohol-free" },
    { key: 2, text: "Celery-free", value: "celery-free" },
    { key: 3, text: "Crustacean-free", value: "crustacean-free" },
    { key: 4, text: "Dairy", value: "dairy-free" },
    { key: 5, text: "Eggs", value: "egg-free" },
    { key: 6, text: "Fish", value: "fish-free" },
    { key: 7, text: "FODMAP-free", value: "fodmap-free" },
    { key: 8, text: "Gluten-free", value: "gluten-free" },
    { key: 9, text: "Keto", value: "keto-friendly" },
    { key: 10, text: "Kidney friendly", value: "kidney-friendly" },
    { key: 11, text: "Kosher", value: "kosher" },
    { key: 12, text: "Lupine-free", value: "lupine-free" },
    { key: 13, text: "Mustard-free", value: "mustard-free" },
    { key: 14, text: "No oil added", value: "no-oil-added" },
    { key: 15, text: "No simple sugars", value: "low-sugar" },
    { key: 16, text: "Paleo", value: "paleo" },
    { key: 17, text: "Peanut-free", value: "peanut-free" },
    { key: 18, text: "Pescatarian", value: "pescatarian" },
    { key: 19, text: "Pork-free", value: "pork-free" },
    { key: 20, text: "Red meat-free", value: "red-meat-free" },
    { key: 21, text: "Sesame-free", value: "sesame-free" },
    { key: 22, text: "Shellfish", value: "shellfish-free" },
    { key: 23, text: "Soy", value: "soy-free" },
    { key: 24, text: "Sugar-conscious", value: "sugar-conscious" },
    { key: 25, text: "Tree nut-free", value: "tree-nut-free" },
    { key: 26, text: "Vegan", value: "vegan" },
    { key: 27, text: "Vegetarian", value: "vegetarian" },
    { key: 28, text: "Wheat-free", value: "wheat-free" },
  ];

  // empty object to store dietary options and restrictions
  let healthObj = { diet: [], restrictions: [] };

  // set dietary options for recipe search
  function dietaryOptions(diet) {
    healthObj.diet = [];
    healthObj.diet.push(diet);
  }
  // set dietary restrictions for recipe search
  function dietaryRestrictions(restrictions) {
    healthObj.restrictions = [];
    healthObj.restrictions.push(restrictions);
  }

  return (
    <div id="cover">
      <form
        onSubmit={e => {
          e.preventDefault();
          props.fetchSearchResults(ingredient);
          // store dietary options and restrictions in local storage
          // for later use in axios request for recipes
          localStorage.setItem("healthObj", JSON.stringify(healthObj));
        }}
      >
        <div className="tb">
          <div className="td">
            <input
              type="text"
              name="ingredient"
              placeholder="What's on the menu today?"
              value={props.name}
              onChange={e => {
                setIngredient(e.target.value);
              }}
              required
            />
          </div>
          <div className="td" id="s-cover">
            <button type="submit">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
      <div className="dropdown-container">
        <Dropdown
          className="left-drop"
          placeholder="Dietary Options"
          multiple
          options={dietOptions}
          selection
          onChange={(e, { value }) => dietaryOptions(value)}
        />
        <Dropdown
          placeholder="Dietary Restrictions"
          multiple
          options={restrictiveOptions}
          selection
          onChange={(e, { value }) => dietaryRestrictions(value)}
        />
      </div>
    </div>
  );
}
export default Searchbar;
