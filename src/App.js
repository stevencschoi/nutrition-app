import React from "react";
import Nav from "./components/Header/Nav";
import Home from "./components/Home";
import Ingredient from "./components/Ingredient";
import Recipe from "./components/Recipe";
import Favourites from "./components/Favourites";
import Schedule from "./components/Schedule";
import MacroGraph from "./components/MacroGraph";
import Register from "./components/Register";
import FAQ from "./components/FAQ";
import { Redirect } from 'react-router-dom';
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
          <Route path="/schedule" exact component={Schedule} />
          <Route path="/data" exact component={MacroGraph} />
          <Route path="/register" exact component={Register} />
          <Route path="/faq" exact component={FAQ} />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
// <Footer />
