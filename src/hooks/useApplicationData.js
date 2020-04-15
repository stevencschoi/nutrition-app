import { useState, useEffect } from "react";
import axios from "axios";
// stretch assignment to include sockets for real-time data updating
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function useApplicationData() {
  const [state, setState] = useState({
    search: "",

  });

  // ******************** sockets ********************
  useEffect(() => {
    socket.onopen = function () {
      socket.send("ping");
    };
  }, []);

  // socket.onmessage = function(event) {
  //   // parse message from server
  //   const msg = JSON.parse(event.data);
  //   // listen for EDIT_SLOT and update state
  //   if (msg.type === "EDIT_SLOT") {
  //     updateAppointment(msg.id, msg.interview);
  //   }
  // };

  // close connection
  socket.onclose = function () {
    console.log("Connection closed");
  };
  // ****************************************

  function fetchSearchResults(ingredient) {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    axios
      .get(
        `https://api.edamam.com/api/food-database/parser?ingr=raw%20${ingredient}&app_id=${dbId}&app_key=${dbKey}`
      )
      .then((result) => {
        const searchResultsArray = result.data.hints.map((item) => {
          if (item.food.image) {
            const code = `${item.food.foodId}`;
            const label = `${item.food.label}`;
            const image = `${item.food.image}`;
            return (
              <SearchResult key={code} id={code} label={label} image={image} />
            );
          }
        });
        setState(prev => {
          ...prev,
          search: result
        });
      })
      .catch((error) => console.error(error));
  }

  return { state, fetchSearchResults };
}
