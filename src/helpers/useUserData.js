import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { socket } from "../hooks/useApplicationData";

// ******************** follower functions ********************
export default function useUserData() {
  const [state, setState] = useState({
    users: [],
  });
  // get followers array
  function getFollowers() {
    axios
      .get("/user/following")
      .then((result) => {
        result.data.forEach((follower) => {
          return follower.follow_id;
        });
      })
      .catch((error) => console.error(error));
  }

  // follow user function
  function follow(userId) {
    console.log("id: ", userId);
    axios
      .post("user/add", {
        followId: userId,
      })
      .then((result) => {
        getFollowers();
        socket.emit("new", () => {
          console.log("Socket sending from follow user");
        });
      })
      .catch((error) => console.error(error));
  }

  // display users in carousel
  function fetchUsers() {
    axios
      .get("/user/all")
      .then((result) => {
        const usersArray = result.data.map((user) => {
          const id = user.id;
          const label = user.first_name;
          const image = user.avatar;

          return (
            <RecipeCard
              key={id}
              label={label}
              image={image}
              follow={() => {
                follow(user.id);
              }}
            />
          );
        });
        setState((prev) => ({
          ...prev,
          users: usersArray,
        }));
      })
      .catch((error) => console.error(error));
  }

  return {
    state,
    fetchUsers,
    getFollowers,
  };
}
