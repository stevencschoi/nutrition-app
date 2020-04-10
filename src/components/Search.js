import React, { useState, useContext } from "react";
import "./styles.css";
import axios from "axios";

// UserContext.js
// const UserContext = React.createContext("");

function Nav() {
  // const apikey = process.env.REACT_APP_API_KEY
  // useEffect(() => {
  //   axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${apikey}&number=1&query=banana`).then(result => console.log(result));
  // }, []);
  const [user, setUser] = useState("");
  return (
    <div class="search">

    </div>
  );
}

export default Nav;