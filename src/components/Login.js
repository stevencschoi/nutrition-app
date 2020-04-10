import React, { useState, useContext, Redirect } from "react";
import "./styles.css";
import axios from "axios";

const Login = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // return value of this useContext will be whatever the `value` prop
  // is for the UserContext.Provider
  // const setUser = useContext(UserContext);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        /* now we want to setUser from app */
        props.setUser(name);
        setName(name);
        localStorage.setItem('user', name);
        // setName("");
      }}
    >
      <input
        placeholder="username"
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <button>
        Login
      </button>
    </form>
  );
};

export default Login;
