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
        <h3 id="logo">
          Veg<i class="fas fa-seedling"></i>able
        </h3>
      </Link>
      <div className="media">
        <Link to="/favourites">
          <h3>
            <i class="far fa-heart"></i> Favourites
          </h3>
        </Link>
        <Link to="/schedule">
          <h3>
            <i class="far fa-calendar-alt"></i> Schedule
          </h3>
        </Link>
        <Link to="/data">
          <h3>
            <i class="fas fa-chart-line"></i> Data
          </h3>
        </Link>
      </div>
      {user && (
        <div id="logged-user">
          Logged in as {user}
          <Logout setUser={setUser} />
        </div>
      )}
      <div className="register">
        {!user && <Login setUser={setUser} />}
        {!user && (
          <Link to="/register">
            <h3>Register</h3>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
