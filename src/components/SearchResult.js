import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <Link to={`/ingredient/${props.id}/${props.label}`}>
      <div>
        <img src={props.image} />
        <h4 className="legend">{props.label}</h4>
      </div>
    </Link>
  );
}

export default SearchResult;
