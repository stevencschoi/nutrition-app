import React from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";

function Logout(props) {

  const closeUser = () => {
    axios.post
      ('/logout')
      .then((result) => {
        console.log(result)
        Cookies.remove('userId');
      })
      .catch((error) => console.error(error));
  }

  return (
    <button
    onClick={e => {
      localStorage.removeItem('user');
      props.setUser("");
      closeUser();
    }}>
      Logout
    </button>
  );
}

export default Logout;
