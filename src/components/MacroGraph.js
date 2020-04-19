import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import CoolCarousel from "./CoolCarousel";
import useUserData from "../helpers/useUserData";
import { socket } from "../hooks/useApplicationData";
import io from "socket.io-client";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const options = [
  { key: 1, text: "Calories", value: "Calories" },
  { key: 2, text: "Fat", value: "Fat" },
  { key: 3, text: "Carbohydrates", value: "Carbohydrates" },
  { key: 4, text: "Fiber", value: "Fiber" },
  { key: 5, text: "Sugar", value: "Sugar" },
  { key: 6, text: "Protein", value: "Protein" },
  { key: 7, text: "Cholesterol", value: "Cholesterol" },
  { key: 8, text: "Sodium", value: "Sodium" },
];

// Renders the nutritional data of the chosen ingredient
function MacroGraph() {
  const [pick, setPick] = useState("Calories");
  const [graph, setGraph] = useState("Calories");
  const [data, setData] = useState(null);

  const { state, fetchUsers, getFollowers } = useUserData();

  useEffect(() => {
    getData(pick);
    fetchUsers();
    getFollowers();
  }, [pick]);

  useEffect(() => {
    // when receiving update message from server, re-render graph
    socket.on("update", () => {
      console.log("hi");
      getData(pick);
    });
  }, []);

  const getData = (choice) => {
    const start = JSON.stringify(moment().startOf("week")).slice(1, 11);
    const end = JSON.stringify(moment().startOf("week").weekday(6)).slice(
      1,
      11
    );

    console.log("start", start, "end", end, "pick", pick);
    axios
      .get(`/user/data?startDate=${start}&endDate=${end}&userChoice=${choice}`)
      .then((result) => {
        // console.log("number of followers", result.data.followers.length);
        // console.log("stuff from database", result.data);
        setData(result.data);

        const newGraph = makeGraph(
          pick,
          result.data.userData,
        );
        setGraph(newGraph);

        // if (result.data.followers.length === 0) {
        //   const newGraph = makeGraph(
        //     pick,
        //     result.data.userData,
        //   );
        //   setGraph(newGraph);
        // } else {
        //   const newGraph = makeGraph(
        //     pick,
        //     result.data.userData,
        //     result.data.followers[0].userData,
        //   );
        //   setGraph(newGraph);
        // };
      })
      .catch((error) => console.error(error));
  };

  // const days1 = ["Sunday", .....]
  // const label = { "Daily Recommended Intake (Calories)": 2000 }

  // const abc = () => {
  //   const realdataforthegraph = []
  //   if (dailyCalories) {
  //     i
  //     days1.length
  //     return realdataforthegraph
  //   }
  // }
  //
  // name: followers[i] ? getdata[i].sum : 0

  // if (pick === "Calories") {
  //   dailyPick = dailyCalories;
  //   pickQuantity = "Daily Recommended Intake (Calories)";
  //   yAxis = [0, 4000];
  //   graphLabel = "Calories consumed / day";
  // }

  // IN THIS CASE, THIS WILL RESULT IN AN ARRAY OF DATA EQUAL TO THE OG dailyCalories array
  // use some if statements to determine dailyType based on pick
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dailyType = (pick, getdata) => {
    const actualGraphData = []
    let pickQuantity = ""
    let yAxis = [];
    let graphLabel = "";
    for (let i = 0; i < days.length; i++) {
      if (pick === "Calories") {
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (Calories)": 2000,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Daily Recommended Intake (Calories)"
        yAxis = [0, 4000];
        graphLabel = "Calories consumed / day";
      } else if (pick === "Fat") {
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 45,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 200];
        graphLabel = "grams of fat consumed / day";
      } else if (pick === "Carbohydrates") {
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 130,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 400];
        graphLabel = "grams of carbohydrates consumed / day";
      } else if (pick === "Fiber") {
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 31.5,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 100];
        graphLabel = "grams of fiber consumed / day";
      } else if (pick === "Sugar") {
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (grams)": 48,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Maximum Daily Recommended Intake (grams)"
        yAxis = [0, 250];
        graphLabel = "grams of sugar consumed / day";
      } else if (pick === "Protein") {
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 51,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 300];
        graphLabel = "grams of protein consumed / day";
      } else if (pick === "Cholesterol") {
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (milligrams)": 300,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Maximum Daily Recommended Intake (milligrams)"
        yAxis = [0, 600];
        graphLabel = "milligrams of cholesterol consumed / day";
      } else if (pick === "Sodium") {
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (milligrams)": 1500,
            You: getdata[i].sum
          }
        )
        pickQuantity = "Maximum Daily Recommended Intake (milligrams)"
        yAxis = [0, 7500];
        graphLabel = "milligrams of sodium consumed / day";
      }
    };
    return [actualGraphData, pickQuantity, yAxis, graphLabel]
  };

  // Recharts function for bar graph
  const makeGraph = (pick, getdata, followers) => {
    const values = dailyType(pick, getdata)
    let dailyPick = values[0];
    let pickQuantity = values[1];
    let yAxis = values[2];
    let graphLabel = values[3];

    // const graphTitle = "Calories";

    // const dailyCalories = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //     // Follower: followers[0] ? followers[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //     // Follower: followers[1] ? followers[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //     // Follower: followers[2] ? followers[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //     // Follower: followers[3] ? followers[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //     // Follower: followers[4] ? followers[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //     // Follower: followers[5] ? followers[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (Calories)": 2000,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //     // Follower: followers[6] ? followers[6].sum : 0,
    //   },
    // ];

    // const dailyFat = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (grams)": 45,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailyCarbohydrates = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (grams)": 130,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailyFiber = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (grams)": 31.5,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailySugar = [
    //   {
    //     name: "Sunday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Maximum Daily Recommended Intake (grams)": 48,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailyProtein = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (grams)": 51,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailyCholesterol = [
    //   {
    //     name: "Sunday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Maximum Daily Recommended Intake (milligrams)": 300,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];
    // const dailySodium = [
    //   {
    //     name: "Sunday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[0] ? getdata[0].sum : 0,
    //   },
    //   {
    //     name: "Monday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[1] ? getdata[1].sum : 0,
    //   },
    //   {
    //     name: "Tuesday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[2] ? getdata[2].sum : 0,
    //   },
    //   {
    //     name: "Wednesday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[3] ? getdata[3].sum : 0,
    //   },
    //   {
    //     name: "Thursday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[4] ? getdata[4].sum : 0,
    //   },
    //   {
    //     name: "Friday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[5] ? getdata[5].sum : 0,
    //   },
    //   {
    //     name: "Saturday",
    //     "Daily Recommended Intake (milligrams)": 1500,
    //     You: getdata[6] ? getdata[6].sum : 0,
    //   },
    // ];

    // let dailyPick = "";
    // let pickQuantity = "";
    // let yAxis = [];
    // let graphLabel = "";

    // if (pick === "Calories") {
    //   dailyPick = dailyCalories;
    //   pickQuantity = "Daily Recommended Intake (Calories)";
    //   yAxis = [0, 4000];
    //   graphLabel = "Calories consumed / day";
    // }
    // if (pick === "Fat") {
    //   dailyPick = dailyFat;
    //   pickQuantity = "Daily Recommended Intake (grams)";
    //   yAxis = [0, 200];
    //   graphLabel = "grams of fat consumed / day";
    // }
    // if (pick === "Carbohydrates") {
    //   dailyPick = dailyCarbohydrates;
    //   pickQuantity = "Daily Recommended Intake (grams)";
    //   yAxis = [0, 400];
    //   graphLabel = "grams of carbohydrates consumed / day";
    // }
    // if (pick === "Fiber") {
    //   dailyPick = dailyFiber;
    //   pickQuantity = "Daily Recommended Intake (grams)";
    //   yAxis = [0, 100];
    //   graphLabel = "grams of fiber consumed / day";
    // }
    // if (pick === "Sugar") {
    //   dailyPick = dailySugar;
    //   pickQuantity = "Maximum Daily Recommended Intake (grams)";
    //   yAxis = [0, 250];
    //   graphLabel = "grams of sugar consumed / day";
    // }
    // if (pick === "Protein") {
    //   dailyPick = dailyProtein;
    //   pickQuantity = "Daily Recommended Intake (grams)";
    //   yAxis = [0, 300];
    //   graphLabel = "grams of protein consumed / day";
    // }
    // if (pick === "Cholesterol") {
    //   dailyPick = dailyCholesterol;
    //   pickQuantity = "Maximum Daily Recommended Intake (milligrams)";
    //   yAxis = [0, 600];
    //   graphLabel = "milligrams of cholesterol consumed / day";
    // }
    // if (pick === "Sodium") {
    //   dailyPick = dailySodium;
    //   pickQuantity = "Daily Recommended Intake (milligrams)";
    //   yAxis = [0, 7500];
    //   graphLabel = "milligrams of salt consumed / day";
    // }

    return (
      <div class="graph-container">
        <div class="graph">
          <p class="graph-label">{graphLabel}</p>
          <LineChart
            width={750}
            height={250}
            data={dailyPick}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={yAxis} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={pickQuantity}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="You" stroke="#82ca9d" />
            {/* <Line type="monotone" dataKey="Follower" stroke="#000000" /> */}
          </LineChart>
        </div>
      </div>
    );
  };
  return (
    <>
      <div class="nutritional-data">
        <h2>
          Weekly consumption of{" "}
          {pick && (
            <Dropdown
              compact
              text={pick}
              options={options}
              selection
              onChange={(e, { value }) => setPick(value)}
            />
          )}{" "}
          per day
        </h2>
        {/* <br></br> */}
        {pick && graph}
      </div>
      <div id="carousel">
        <h2>Discover People</h2>
        {state.users && <CoolCarousel recipes={state.users} />}
      </div>
    </>
  );
}
export default MacroGraph;

// return (
//   <>
//     {pick && (
//       <Dropdown
//         text={pick}
//         options={options}
//         selection
//         onChange={(e, { value }) => setPick(value)}
//       />
//     )}
//     <div class="nutritional-data">
//       <h2>Weekly consumption of {pick} per day</h2>
//       <br></br>
//       {pick && graph}
//     </div>
//     {state.users && <CoolCarousel recipes={state.users} />}
//   </>
// );