import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import Button from "../components/Button";

import { Redirect } from "react-router-dom";

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

  const usernameTaken = () => alert("Sorry, this username has already been taken!");
    
  function handleSubmit(e) {
    e.preventDefault();
    /* now we want to setUser from app */
    axios
      .put(`/register`, inputs)
      .then(() => {
        clearInputs();
        setToHome(true);
      })
      // alert user if username is already in database
      .catch(error => usernameTaken());
  }

  return (
    <>
      {/* if user registers, redirect to home page */}
      {toHome && <Redirect to="/" />}
      <form onSubmit={handleSubmit} className="registerform">
        <input
          placeholder="username"
          required="required"
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
          required="required"
          name="email"
          placeholder="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          required="required"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <input
          placeholder="link to image for avatar"
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