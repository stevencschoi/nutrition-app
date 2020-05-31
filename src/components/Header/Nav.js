import React, { useState } from "react";
import "../styles.scss";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Nav() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <nav className="nav">
      {/* if user is logged out */}
      {!user && (
        <div className="nav-plus-logo">
          <Link to="/">
            <h3 id="logo">
              Veg<i className="fas fa-seedling"></i>able
            </h3>
          </Link>
          <div className="nav-logged-out">
            <Login setUser={setUser} />
            <div className="register-faq">
              <Link to="/register">
                <h3>Register</h3>
              </Link>
              <Link to="/faq">
                <h3>FAQ</h3>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* if user is logged in */}
      {user && (
        <div className="nav-plus-logo logged-in-container">
          <Link to="/">
            <h3 id="logo">
              Veg<i className="fas fa-seedling"></i>able
            </h3>
          </Link>
          <div className="nav-logged-in">
            <div className="logged-user">
              Logged in as {user}
              <Logout setUser={setUser} />
              <Link to="/faq">
                <h3>FAQ</h3>
              </Link>
            </div>
            <div className="media">
              <div className="favourites-media">
                <Link to="/favourites">
                  <h3>
                    <i className="far fa-heart"></i> Favourites
                  </h3> 
                </Link>
              </div>
              <div className="other-media">
                <Link to="/schedule">
                  <h3>
                    <i className="far fa-calendar-alt"></i> Schedule
                  </h3>
                </Link>
              </div>
              <div className="other-media">
              <Link to="/data">
                <h3>
                  <i className="fas fa-chart-line"></i> Data
                </h3>
              </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="edamam-wrapper">
        <div id="edamam-badge" data-color="white">
        </div>
      </div>
    </nav>
  );
}

export default Nav;