import React, { useState, useContext } from "react";
import "./styles.css";
import axios from "axios";

// UserContext.js
// const UserContext = React.createContext("");

function Logout(props) {
  // useEffect(() => {
  //   axios.get("http://localhost:8008").then(result => console.log(result));
  // }, []);
  return (
    <button
    onClick={e => {
      localStorage.removeItem('user');
      props.setUser("");
    }}>
      Logout
    </button>
  );
}

export default Logout;
