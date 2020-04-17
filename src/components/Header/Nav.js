import React, { useState } from "react";
import "../styles.scss";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Nav() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <nav className="nav">
      <Link to="/">
        <h3>VegTable</h3>
      </Link>
      <Link to="/favourites">
        <h3>Favourites</h3>
      </Link>
      <Link to="/schedule">
        <h3>Schedule</h3>
      </Link>
      <Link to="/data">
        <h3>Data</h3>
      </Link>
      {user && (
        <div>
          Logged in as {user}
          <Logout setUser={setUser} />
        </div>
      )}
      {!user && <Login setUser={setUser} />}
      {/* <Signup/> */}
    </nav>
  );
}

export default Nav;
