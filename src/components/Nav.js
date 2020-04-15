import React, {useEffect, useState } from "react";
import "./styles.scss";
import Cookies from "js-cookie";
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
        <i class="far fa-heart"></i>
      </Link>

      <Link to="/">
      <i class="fas fa-search"></i>
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

// const currentUser = Cookies.get('userId')

// axios.get
// ('/favourites',{ userId: currentUser })
// .then((result) => {
//   // console.log(result.data)
//   setUserfavourites(result.data)
// })
// .catch((error) => console.error(error));