import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
// import useApplicationData from "../hooks/useApplicationData";


function SearchResult(props) {

  // const { state, persist } = useApplicationData();
  // const oldState = localStorage.getItem('persistedState')
  // const useableState = JSON.parse(oldState)
  // // // console.log("WORKS?", JSON.parse(oldState))
  // // persist(useableState)
  // console.log("WORKS?", state)
  // console.log("huh?", useableState)


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
