import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <div class="search-result">
      <Link to={`/ingredient/${props.id}/${props.label}`}>
        <img src={props.image} />
      </Link>
      <Link to={`/ingredient/${props.id}/${props.label}`}>
        <h4>{props.label}</h4>
      </Link>
    </div>
  );
}

export default SearchResult;
