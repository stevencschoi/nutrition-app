import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Cookies from "js-cookie";

const Favourites = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const currentUser = Cookies.get('userId')

  }, []);

  const getFavourites = () => {

    const currentUser = Cookies.get('userId')

    axios.post
      ('/favourites',{ userId: currentUser})
      .then((result) => {
        console.log(result.data.id)
        Cookies.set('userId', result.data.id)
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
    <h1>Favourites</h1>
    </>
  );
};

export default Favourites;
