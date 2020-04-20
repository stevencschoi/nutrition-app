import React from "react";
import "./styles.scss";
import Searchbar from "./Searchbar";
import useApplicationData from "../hooks/useApplicationData";

function Home() {
  const { state, fetchSearchResults } = useApplicationData();

  return (
    <>
      <Searchbar
        className="topmargin"
        fetchSearchResults={fetchSearchResults}
      />
      <div className="search">{state.search}</div>
    </>
  );
}

export default Home;
