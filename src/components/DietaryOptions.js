import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "./styles.scss";

function DietaryOptions(props) {
  const [diet, setDiet] = useState("");
  const [restrictions, setRestrictions] = useState("");

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
    <div className="restriction">
      <Dropdown
        placeholder="Dietary Options"
        multiple
        options={dietOptions}
        selection
        onChange={(e, { value }) => setDiet(value)}
      />
      <Dropdown
        placeholder="Dietary Restrictions"
        multiple
        options={restrictiveOptions}
        selection
        onChange={(e, { value }) => setRestrictions(value)}
      />
    </div>
  );
}

export default DietaryOptions;
