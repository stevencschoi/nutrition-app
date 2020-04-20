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
  const [pick, setPick] = useState("Calories");
  const [graph, setGraph] = useState(null);
  const [data, setData] = useState(null);

  const { state, fetchUsers, getFollowers } = useUserData();

  useEffect(() => {
    getData(pick);
    fetchUsers();
    getFollowers();

    socket.on("update", () => {
      console.log("hi");
      getData(pick);
    });
  }, [pick]);

  // useEffect(() => {
  //   // when receiving update message from server, re-render graph
  //   socket.on("update", () => {
  //     console.log("hi");
  //     getData(pick);
  //   });
  // }, [pick]);

  const getData = (choice) => {
    const start = JSON.stringify(moment().startOf("week")).slice(1, 11);
    const end = JSON.stringify(moment().startOf("week").weekday(6)).slice(
      1,
      11
    );
    axios
      .get(`/user/data?startDate=${start}&endDate=${end}&userChoice=${choice}`)
      .then((result) => {
        setData(result.data);
        if (result.data.followers.length === 0) {
          const newGraph = makeGraph(
            pick,
            result.data.userData,
          );
          setGraph(newGraph);
        } else {
          const newGraph = makeGraph(
            pick,
            result.data.userData,
            result.data.followers,
          );
          setGraph(newGraph);
        };
      })
      .catch((error) => console.error(error));
  };
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dailyType = (pick, getdata, followers) => {
    console.log(getdata)
    const actualGraphData = []
    let pickQuantity = ""
    let yAxis = [];
    let graphLabel = "";

    for (let i = 0; i < days.length; i++) {
      if (pick === "Calories") {
        pickQuantity = "Daily Recommended Intake (Calories)"
        yAxis = [0, 4000];
        graphLabel = "Calories consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (Calories)": 2000,
            You: getdata[i].sum,
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Fat") {
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 200];
        graphLabel = "grams of fat consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 45,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Carbohydrates") {
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 400];
        graphLabel = "grams of carbohydrates consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 130,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Fiber") {
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 100];
        graphLabel = "grams of fiber consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 31.5,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Sugar") {
        pickQuantity = "Maximum Daily Recommended Intake (grams)"
        yAxis = [0, 250];
        graphLabel = "grams of sugar consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (grams)": 48,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Protein") {
        pickQuantity = "Daily Recommended Intake (grams)"
        yAxis = [0, 300];
        graphLabel = "grams of protein consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Daily Recommended Intake (grams)": 51,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Cholesterol") {
        pickQuantity = "Maximum Daily Recommended Intake (milligrams)"
        yAxis = [0, 600];
        graphLabel = "milligrams of cholesterol consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (milligrams)": 300,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      } else if (pick === "Sodium") {
        pickQuantity = "Maximum Daily Recommended Intake (milligrams)"
        yAxis = [0, 7500];
        graphLabel = "milligrams of sodium consumed / day";
        actualGraphData.push(
          {
            name: days[i],
            "Maximum Daily Recommended Intake (milligrams)": 1500,
            You: getdata[i].sum
          }
        )
        if (followers) {
          for (let j = 0; j < followers.length; j++) {
            actualGraphData[i][followers[j].userId] = followers[j].userData[i].sum
          }
        }
      }
    }
    return [actualGraphData, pickQuantity, yAxis, graphLabel];
  };

  // Recharts function for bar graph
  const makeGraph = (pick, getdata, followers) => {
    const values = dailyType(pick, getdata, followers);
    let dailyPick = values[0];
    let pickQuantity = values[1];
    let yAxis = values[2];
    let graphLabel = values[3];

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
            label={{
              value: graphLabel,
              dx: -30,
              angle: -90,
              position: "center",
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
            {/* conditionally render follower lines on graph */}
            {followers && followers.map((user) => {
              let id = `${user.userId}`
              let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
              return (<Line type="monotone" dataKey={id} stroke={randomColor} />)
            })}
          </LineChart>
      </ResponsiveContainer>
    );
  };
  return (
    <div className="graph-carousel-container">
      <div className="white-background">
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
          <div id="macro-graph-container">{pick && graph}</div>
        </div>
      </div>
      <div className="carousel">
        <h2>Discover People</h2>
        {state.users && <CoolCarousel recipes={state.users} />}
      </div>
    </div>
  );
}
export default MacroGraph;
