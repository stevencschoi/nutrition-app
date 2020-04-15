import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Ingredient from "./components/Ingredient";
import Recipe from "./components/Recipe";
import Favourites from "./components/Favourites";
import Data from "./components/Data";
// import SearchResult from "./components/SearchResult";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredient/:id/:id" exact component={Ingredient} />
          <Route path="/recipe/:id/" exact component={Recipe} />
          <Route path="/favourites" exact component={Favourites} />
          <Route path="/data" exact component={Data} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
