import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "./styles.scss";
import useApplicationData from "../hooks/useApplicationData";

function Searchbar(props) {
  const { state, dietaryOptions, dietaryRestrictions } = useApplicationData();
  const [ingredient, setIngredient] = useState("");
  // const [restrictions, setRestrictions] = useState([]);

  console.log(state)

  const dietOptions = [
    { key: 1, text: "balanced", value: "balanced" },
    { key: 2, text: "high-fiber", value: "high-fiber" },
    { key: 3, text: "high-protein", value: "high-protein" },
    { key: 4, text: "low-carb", value: "low-carb" },
    { key: 5, text: "low-fat", value: "low-fat" },
    { key: 6, text: "low-sodium", value: "low-sodium" },
  ];

  const restrictiveOptions = [
    { key: 1, text: "vegetarian", value: "vegetarian" },
    { key: 2, text: "alcohol-free", value: "alcohol-free" },
    { key: 3, text: "dairy-free", value: "dairy-free" },
    { key: 4, text: "egg-free", value: "egg-free" },
    { key: 5, text: "gluten-free", value: "gluten-free" },
    { key: 6, text: "peanut-free", value: "peanut-free" },
    { key: 7, text: "red meat-free", value: "red-meat-free" },
    { key: 8, text: "shellfish-free", value: "shellfish-free" },
    { key: 9, text: "keto", value: "keto" },
    { key: 10, text: "paleo", value: "paleo" },
  ];

  return (
    <div id="cover">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.fetchSearchResults(ingredient);
          const persistedState = state
          localStorage.setItem('persistedState', JSON.stringify(persistedState));
        }}
      >
        <div class="tb">
          <div class="td">
            <input
              type="text"
              name="ingredient"
              placeholder="What's on the menu today?"
              value={props.name}
              onChange={(e) => {
                setIngredient(e.target.value);
              }}
              required
            />
          </div>
          <div class="td" id="s-cover">
            <button type="submit">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
        <Dropdown
          placeholder="Dietary Options"
          multiple
          options={dietOptions}
          selection
          onChange={(e) => dietaryOptions(e.target.innerText)}
        />
        <Dropdown
          placeholder="Dietary Restrictions"
          multiple
          options={restrictiveOptions}
          selection
          onChange={(e) => dietaryRestrictions(e.target.innerText)}
        />
      </form>
    </div>
  );
}

export default Searchbar;
