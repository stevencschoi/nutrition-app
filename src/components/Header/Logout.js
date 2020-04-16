import React from "react";
import "../styles.scss";
import axios from "axios";
import Button from "../Button";
import Cookies from "js-cookie";

function Logout(props) {
  // log out user
  const closeUser = () => {
    axios
      .post("/logout")
      .then((result) => {
        Cookies.remove("userId");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Button
      onClick={(e) => {
        localStorage.removeItem("user");
        props.setUser("");
        closeUser();
      }}
    >
      Logout
    </Button>
  );
}

export default Logout;
