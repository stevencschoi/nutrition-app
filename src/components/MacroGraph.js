import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import CoolCarousel from "./CoolCarousel";
import useUserData from "../helpers/useUserData";
import { socket } from "../hooks/useApplicationData";
import MealCalendar from "./MealCalendar";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
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
  const [currentDay, setCurrentDay] = useState(moment());
  const [pick, setPick] = useState("Calories");
  const [graph, setGraph] = useState(null);
  
  // const [data, setData] = useState(null); => not sure if this is needed

  const { state, fetchUsers, getFollowers } = useUserData();

  useEffect(() => {
    getData(pick, currentDay);
    fetchUsers();
    getFollowers();

    socket.on("update", () => {
      console.log("hi");
      getData(pick, currentDay);
    });
  }, [pick, currentDay]);

  const getData = (choice, daypick) => {
    const cloneday = daypick.clone();
    const start = JSON.stringify(cloneday.startOf("week")).slice(1, 11);
    const end = JSON.stringify(cloneday.startOf("week").weekday(6)).slice(
      1,
      11
    );
    axios
      .get(`/user/data?startDate=${start}&endDate=${end}&userChoice=${choice}`)
      .then((result) => {
        // console.log("result.data", result.data)
        // console.log("result.data.userData", result.data.userData)
        
        // setData(result.data); => don't think this is needed?
        
        // array to use when no data for all 7 days
        const noData = [
          { sum: 0 },
          { sum: 0 },
          { sum: 0 },
          { sum: 0 },
          { sum: 0 },
          { sum: 0 },
          { sum: 0 },
        ]

        // check to see if user has data for all 7 days, if they are following anyone, and if the users they are following have data for all 7 days
        
        // user has data, not following other user(s)
        if (result.data.userData[0] != undefined && result.data.followers.length === 0) {
            const newGraph = makeGraph(
              pick, 
              result.data.userData
              );
            setGraph(newGraph);

        // user has data and follows other user(s), following has data
        } else if (result.data.userData[0] != undefined && result.data.followers.length != 0 && result.data.followers[0].userData != undefined){
            const newGraph = makeGraph(
              pick,
              result.data.userData,
              result.data.followers
            );
            setGraph(newGraph);

        // user has data and follows other user(s), following has no data
        } else if (result.data.userData[0] != undefined && result.data.followers.length != 0 && result.data.followers[0].userData === undefined) {
          
            const newGraph = makeGraph(
              pick,
              result.data.userData,
              noData
            );
            setGraph(newGraph);
        
        // user has NO data and does not follow other user(s)
        } else if (result.data.userData[0] === undefined && result.data.followers.length === 0) {
            const newGraph = makeGraph(
              pick, 
              noData);
            setGraph(newGraph);

        // user has NO data and follows other user(s), following has data
        } else if (result.data.userData[0] === undefined && result.data.followers.length != 0 && result.data.followers[0].userData != undefined) {
          const newGraph = makeGraph(
              pick,
              noData,
              result.data.followers
            );
            setGraph(newGraph);

        // user has NO data and follows other user(s), following has NO data
        } else if (result.data.userData[0] === undefined && result.data.followers.length != 0 && result.data.followers[0].userData === undefined) {
          const newGraph = makeGraph(
              pick,
              noData,
              noData
            );
            setGraph(newGraph);
        }
      })
      .catch((error) => console.error(error));
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dailyType = (pick, getdata, followers) => {
    // console.log("followers",followers);
    // console.log("getdata", getdata)
    const actualGraphData = [];
    let pickQuantity = "";
    let graphLabel = "";

    // will atttempt to extract this out of each pick
    // const followerData = () => {
    //   for (let j = 0; j < followers.length; j++) {
    //     actualGraphData[i][followers[j].userData[0].username] =
    //       Number(followers[j].userData[i].sum);
    //   }
    // }

    for (let i = 0; i < days.length; i++) {
      if (pick === "Calories") {
        pickQuantity = "Daily Recommended Intake (Calories)";
        graphLabel = "Calories consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (Calories)": 2000,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Fat") {
        pickQuantity = "Daily Recommended Intake (grams)";
        graphLabel = "grams of fat consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (grams)": 45,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Carbohydrates") {
        pickQuantity = "Daily Recommended Intake (grams)";
        graphLabel = "grams of carbohydrates consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (grams)": 130,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Fiber") {
        pickQuantity = "Daily Recommended Intake (grams)";
        graphLabel = "grams of fiber consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (grams)": 31.5,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Sugar") {
        pickQuantity = "Maximum Daily Recommended Intake (grams)";
        graphLabel = "grams of sugar consumed / day";
        actualGraphData.push({
          name: days[i],
          "Maximum Daily Recommended Intake (grams)": 48,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Protein") {
        pickQuantity = "Daily Recommended Intake (grams)";
        graphLabel = "grams of protein consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (grams)": 51,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Cholesterol") {
        pickQuantity = "Maximum Daily Recommended Intake (milligrams)";
        graphLabel = "milligrams of cholesterol consumed / day";
        actualGraphData.push({
          name: days[i],
          "Maximum Daily Recommended Intake (milligrams)": 300,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      } else if (pick === "Sodium") {
        pickQuantity = "Daily Recommended Intake (milligrams)";
        graphLabel = "milligrams of sodium consumed / day";
        actualGraphData.push({
          name: days[i],
          "Daily Recommended Intake (milligrams)": 1500,
          You: Number(getdata[i].sum),
        });
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userData[0].username] =
              Number(followers[j].userData[i].sum);
          }
        }
      }
    }
    return [actualGraphData, pickQuantity, graphLabel];
  };

  // Recharts function for bar graph
  const makeGraph = (pick, getdata, followers) => {
    const values = dailyType(pick, getdata, followers);
    // console.log("makeGraph: getdata", getdata)
    // console.log("values", values)
    let dailyPick = values[0];
    let pickQuantity = values[1];
    let graphLabel = values[2];
    return (
      <ResponsiveContainer width="100%" height="100%">
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
          <YAxis
            type="number"
            domain={[0, 'dataMax']}
            label={{
              value: graphLabel,
              dx: -30,
              angle: -90,
              position: "center",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={pickQuantity}
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
          <Line type="monotone" dataKey="You" stroke="#82ca9d" />
          {/* conditionally render follower lines on graph */}
          {followers &&
            followers.map((user) => {
              // let id = `${user.userId}`
              let id = `${user.userData[0].username}`;
              let randomColor = "#000000".replace(/0/g, function () {
                return (~~(Math.random() * 16)).toString(16);
              });
              return <Line type="monotone" dataKey={id} stroke={randomColor} />;
            })}
        </LineChart>
      </ResponsiveContainer>
    );
  };
  const handledaypick = (day) => {
    setCurrentDay(day);
  };
  return (
    <div className="graph-carousel-container">
      <div class="macro-data">
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
        <div id="macro-graph-container">{pick && graph}</div>
      </div>
      <div>
        <MealCalendar
          date={currentDay}
          onChange={(e) => handledaypick(e.target.value)}
        />
      </div>
      <div className="carousel">
        <h2>Discover People</h2>
        {state.users && <CoolCarousel recipes={state.users} />}
      </div>
    </div>
  );
}
export default MacroGraph;
