import React, { useEffect } from "react";
import CoolCarousel from "./CoolCarousel";
import useApplicationData from "../hooks/useApplicationData";

export default function UserCarousel() {
  const { state, fetchUsers } = useApplicationData();

  // display users in carousel on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  return <CoolCarousel recipes={props.users} />;
}
