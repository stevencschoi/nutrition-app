import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "../Button";

const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = (user) => {
    axios
      .post("/login", { userId: user })
      .then((result) => {
        Cookies.set("userId", result.data.id);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form>
      <input
        placeholder="username"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          /* now we want to setUser from app */
          props.setUser(name);
          setName(name);
          verifyUser(name);
          localStorage.setItem("user", name);
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
