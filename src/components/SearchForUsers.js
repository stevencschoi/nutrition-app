import React, { Component, useEffect, useState } from 'react'
import SearchCarousel from "./SearchCarousel"
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import axios from "axios";

function SearchResult(props) {

  const [userlist, setUserlist] = useState()

  useEffect(() => {
    fatchUsers()
  }, [])

  const fatchUsers = () => {
    axios
      .get(
        `/getAllUsers`
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.error(error));
  }
  
  return (
    <div>hi</div>
  );
}

export default SearchResult;
