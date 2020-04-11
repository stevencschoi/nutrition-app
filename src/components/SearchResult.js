import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { Redirect } from "react-router";
import { link } from "react-router-dom";

function SearchResult(props) {
  return (
    // <Link to={`/`}>
    <div id={props.id}>
      <img src={props.image} />
      <h4 className="legend">{props.label}</h4>
    </div>
    // </Link>
  );
}

export default SearchResult;
