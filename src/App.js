import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Ingredient from "./components/Ingredient";
import SearchResult from "./components/SearchResult";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ingredient/:id" exact component={Ingredient} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
