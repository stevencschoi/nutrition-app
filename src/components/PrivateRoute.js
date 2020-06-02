import React, { useState } from "react";
import { Route } from 'react-router-dom'
import Home from "./Home";

const PrivateRoute = ({ component }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const finalComponent = user ? component : Home;

  return <Route component={finalComponent} />;
};

export default PrivateRoute;
