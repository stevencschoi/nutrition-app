import React, { useState } from "react";
import "./styles.css";
import Login from "./Login";
import Logout from "./Logout";

function Nav() {
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
