import React from "react";
import "./styles.scss";
import Searchbar from "./Searchbar";
import useApplicationData from "../hooks/useApplicationData";

function Home() {
  const { state, fetchSearchResults } = useApplicationData();

  return (
    <>
      {!state.search && (
        <div id="home">{/* <h2>Hello, {props.name}</h2> */}</div>
      )}
      <Searchbar fetchSearchResults={fetchSearchResults} />
      <div className="search">{state.search}</div>
    </>
  );
}

export default Home;
