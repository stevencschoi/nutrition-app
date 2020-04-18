import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <div class="search-result">
      <img class="rounded-circle" src={props.image} />
      <Link to={`/ingredient/${props.id}/${props.label}`}>
        <h4 className="legend">{props.label}</h4>
      </Link>
    </div>
  );
}

export default SearchResult;