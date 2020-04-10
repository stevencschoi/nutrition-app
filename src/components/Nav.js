import React, { useState, useContext } from "react";
import "./styles.css";
import axios from "axios";
import Login from "./Login";
import Logout from "./Logout";

// UserContext.js
// const UserContext = React.createContext("");

function Nav() {
  // useEffect(() => {
  //   axios.get("http://localhost:8008").then(result => console.log(result));
  // }, []);
  const [user, setUser] = useState("");
  return (
    <nav className="nav">
      <h3>
        VegTable
        </h3>
      {user && (
        <div>
          Logged in as {user}
          <Logout setUser={setUser} />
        </div>
      )}
      {!user && (
        <Login setUser={setUser} />
      )}
      {/* <Signup/> */}
    </nav>
  );
}

export default Nav;
