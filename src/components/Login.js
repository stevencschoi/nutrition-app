import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";

const Login = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = (asd) => {
    axios.post
      ('/login',{ userId: asd })
      .then((result) => {
        // console.log(result.data.id)
        Cookies.set('userId', result.data.id)
      })
      .catch((error) => console.error(error));
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        /* now we want to setUser from app */
        props.setUser(name);
        setName(name);
        verifyUser(name);
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
