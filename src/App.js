import React, { useEffect } from "react";
import axios from "axios";
import Nav from "./components/Nav";
import Search from "./components/Search";
import "./App.css";

function App() {
  // const apikey = process.env.REACT_APP_API_KEY
  // useEffect(() => {
  //   axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apikey}&number=1&query=banana`).then(result => console.log(result));
  // }, []);
  return (
    <div className="App">
      <Nav />
      <Search />
    </div>
  );
}

export default App;
