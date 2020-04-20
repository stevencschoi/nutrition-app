import React, { useState } from "react";
import "./styles.scss";

function Searchbar(props) {
  const [ingredient, setIngredient] = useState("");

  return (
    <div id="cover">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.fetchSearchResults(ingredient);
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
    </div>
  );
}

export default Searchbar;
