import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";

// const PORT = process.env.PORT || 8008;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [toHome, setToHome] = useState(false);

  const clearInputs = () => {
    setInputs({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      avatar: "",
    });
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(`${PORT}`);
    /* now we want to setUser from app */
    console.log("inputs:", inputs);
    axios
      .put(`/register`, inputs)
      .then(() => {
        clearInputs();
        setToHome(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {toHome && <Redirect to="/" />}
      <form onSubmit={handleSubmit} className="registerform">
        <input
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
        />
        <input
          placeholder="first name"
          name="first_name"
          value={inputs.first_name}
          onChange={handleInputChange}
        />
        <input
          placeholder="last name"
          name="last_name"
          value={inputs.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <input
          placeholder="link to image"
          name="avatar"
          value={inputs.avatar}
          onChange={handleInputChange}
        />

        <Button register type="submit">
          Create Account
        </Button>
      </form>
    </>
  );
};

export default Register;
