import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../Button";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const wrongCredentials = () => 
    alert("Please check your username and password, then try logging in again!");


  const verifyUser = (username, password) => {
    axios
      .post("/login", { username: username, password: password })
      .then(result => {
        Cookies.set({ userId: result.data.id });
        props.setUser(username);
        localStorage.setItem("user", username);
      })
      .catch (error => wrongCredentials());
  };

  return (
    <>
      {/* if user is logged in, redirect to home page */}
      {/* {toHome && <Redirect to="/" />} */}
      <form>
        <input
          placeholder="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <Button
          onClick={e => {
            e.preventDefault();
            /* now we want to setUser from app */
            verifyUser(username, password);
          }}
        >
          <Link to={`/`}>
            Login
          </Link>
        </Button>
      </form>
      {/* {username && <Redirect to="/" />} */}
    </>
  );
};

export default Login;
