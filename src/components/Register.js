import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";

const PORT = process.env.PORT || 8008;

const Register = (props) => {
  const [inputs, setInputs] = useState({
    avatar: ""
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`${PORT}`);
    /* now we want to setUser from app */
    console.log(inputs);
    axios
      .put(`/register`, inputs)
      .then(() => console.log("shit sent"))
      .catch((error) => console.log(error));
    axios
      .put(`/register`, inputs)
      .then(() => console.log("logged"))
      .catch((error) => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit} className="registerform">
      {/* <input
        placeholder="avatar"
        name="avatar"
        value={inputs.avatar}
        onChange={handleInputChange}
      /> */}
      <input
        placeholder="username"
        name="username"
        value={inputs.username}
        onChange={handleInputChange}
      />
      <input
        placeholder="name"
        name="name"
        value={inputs.name}
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

      <button className="registerformButton" type="submit">Submit</button>
    </form>
  );
};

export default Register;
