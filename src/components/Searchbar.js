import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "./styles.scss";
import useApplicationData from "../hooks/useApplicationData";

function Searchbar(props) {
  const { state, dietaryOptions, dietaryRestrictions } = useApplicationData();
  const [ingredient, setIngredient] = useState("");
  console.log("search", localStorage)

  const dietOptions = [
    { key: 1, text: "balanced", value: "balanced" },
    { key: 2, text: "high-protein", value: "high-protein" },
    { key: 3, text: "low-fat", value: "low-fat" },
    { key: 4, text: "low-carb", value: "low-carb" },
  ];

  const restrictiveOptions = [
    { key: 1, text: "vegan", value: "vegan" },
    { key: 2, text: "vegetarian", value: "vegetarian" },
    { key: 3, text: "sugar-conscious", value: "sugar-conscious" },
    { key: 4, text: "peanut-free", value: "peanut-free" },
    { key: 5, text: "tree-nut-free", value: "tree-nut-free" },
    { key: 6, text: "alcohol-free", value: "alcohol-free" },
  ];

  return (
    <div id="cover">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.fetchSearchResults(ingredient);
          
          // store dietary options and restrictions in local state
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
        
      </form>
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
    </div>
  );
}

export default Searchbar;
