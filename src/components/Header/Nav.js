// import React, { useState } from "react";
// import "../styles.scss";
// import Login from "./Login";
// import Logout from "./Logout";
// import { Link } from "react-router-dom";

// function Nav() {
//   const [user, setUser] = useState(localStorage.getItem("user"));

//   return (
//     <nav className="nav">
//       <Link to="/">
//         <h3 id="logo">
//           Veg<i className="fas fa-seedling"></i>able
//         </h3>
//       </Link>



//       <div className="media">
//         <Link to="/favourites">
//           <h3>
//             <i className="far fa-heart"></i> Favourites
//           </h3>
//         </Link>
//         <Link to="/schedule">
//           <h3>
//             <i className="far fa-calendar-alt"></i> Schedule
//           </h3>
//         </Link>
//         <Link to="/data">
//           <h3>
//             <i className="fas fa-chart-line"></i> Data
//           </h3>
//         </Link>
//       </div>


// {/* if user is logged in */}
//       {user && (
//         <div className="logged-user">
//           Logged in as {user}
//           <Logout setUser={setUser} />
//         </div>
//       )}


// {/* no user logged in */}
//       <div className="register">
//         {!user && <Login setUser={setUser} />}
//         {!user && (
//           <Link to="/register">
//             <h3>Register</h3>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Nav;





import React, { useState } from "react";
import "../styles.scss";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Nav() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <nav className="nav">
      {/* <Link to="/">
        <h3 id="logo">
          Veg<i className="fas fa-seedling"></i>able
        </h3>
      </Link> */}



      {/* if user is logged in */}
      {user && (
        <div className="logged-in">
          <Link to="/">
            <h3 id="logo">
              Veg<i className="fas fa-seedling"></i>able
            </h3>
          </Link>
          <div className="media">
            <Link to="/favourites">
              <h3>
                <i className="far fa-heart"></i> Favourites
            </h3>
            </Link>
            <Link to="/schedule">
              <h3>
                <i className="far fa-calendar-alt"></i> Schedule
            </h3>
            </Link>
            <Link to="/data">
              <h3>
                <i className="fas fa-chart-line"></i> Data
            </h3>
            </Link>
          </div>
          <div className="logged-user">
            Logged in as {user}
            <Logout setUser={setUser} />
          </div>
        </div>
      )}

      {/* no user logged in */}
      {/* <div className="register"> */}
        {/* {!user && <Login setUser={setUser} />} */}
        {!user && (
        <div className="logged-out">
          <Link to="/">
            <h3 id="logo">
              Veg<i className="fas fa-seedling"></i>able
            </h3>
          </Link>
          <div className="login-register-faq">
            <Login setUser={setUser} />
            <Link to="/register">
              <h3>Register</h3>
            </Link>
            <Link to="/faq">
              <h3>FAQ</h3>
            </Link>
          </div>
        </div>
        )}
    </nav>
  );
}

export default Nav;