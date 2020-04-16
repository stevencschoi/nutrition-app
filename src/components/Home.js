import React from "react";
import "./styles.scss";
import Searchbar from "./Searchbar";
import useApplicationData from "../hooks/useApplicationData";

function Home() {
  const { state, fetchSearchResults } = useApplicationData();

  return (
    <>
      {!state.search && (
        <div>
          {/* <h2>Hello, {props.name}</h2> */}
          <h2>What ingredient are you starting with?</h2>
        </div>
      )}
      <Searchbar fetchSearchResults={fetchSearchResults} />
      <div className="search">{state.search}</div>
    </>
  );
}

export default Home;

// const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//       interviewers={interviewers}
//       bookInterview={bookInterview}
//       deleteInterview={deleteInterview}
//     />
//   );
// });
