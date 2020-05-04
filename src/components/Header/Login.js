import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../Button";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = (user, password) => {
    axios
      .post("/login", { userId: user, password: password })
      .then((result) => {
        Cookies.set({ userId: result.data.id });
        setUsername(username);
        props.setUser(username);
        localStorage.setItem("user", username);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to={"/"}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              /* now we want to setUser from app */
              verifyUser(username, password);
            }}
          >
            Login
          </Button>
        </Link>
      </form>
      {/*{username && <Redirect to="/" />}*/}
    </>
  );
};

export default Login;
