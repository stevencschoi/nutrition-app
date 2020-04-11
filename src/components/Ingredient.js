import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import Searchbar from "./Searchbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <>
      <Link to={"/"}>Home</Link>
    </>
  );
}

export default SearchResult;
