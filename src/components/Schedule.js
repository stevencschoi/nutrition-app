import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ScheduleItem from "./ScheduleItem";
import MealCalendar from "./MealCalendar";
import moment from "moment";
import "./styles.scss";
import "./schedule.scss";

const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
}

function Schedule() {
  const [currentDay, setCurrentDay] = useState(moment());
  const [schedule, setSchedule] = useState({});
  const [update, setUpdate] = useState(moment());

  // when currentDay state is updated, display that day's meal schedule
  useEffect(() => {
    getDaySchedule(currentDay)
  }, [update]);

  const dayFomater = (num) => {
    let copynum = num
    const arr = []
    for (let i = 0; i < 4; i++) {
      if (copynum > 6) {
        copynum = 0
      }
      arr.push(copynum)
      copynum++
    }
    return arr
  }

  // make get request to server and map results to the page
  const getDaySchedule = (currentDate) => {

    let day = Number(currentDate.format("e"))
    const newday = dayFomater(day)
    const today = currentDate.clone()
    Promise.all([
      axios.get(`/day?date=${today.format("YYYY-MM-DD")}`),
      axios.get(`/day?date=${today.add(1, 'day').format("YYYY-MM-DD")}`),
      axios.get(`/day?date=${today.add(1, 'day').format("YYYY-MM-DD")}`),
      axios.get(`/day?date=${today.add(1, 'day').format("YYYY-MM-DD")}`),
    ])
      .then((res) => {
        const obj = {
          [days[newday[0]]]: res[0].data,
          [days[newday[1]]]: res[1].data,
          [days[newday[2]]]: res[2].data,
          [days[newday[3]]]: res[3].data,
        }
        console.log(obj)
        setSchedule(obj)
      })
  };

  const handledaypick = (day) => {
    // console.log("day", day)
    setCurrentDay(day);
    getDaySchedule(day)
  }

  return (
    <>
      <div className="calendar">
        <MealCalendar
          date={currentDay}
          onChange={(e) => handledaypick(e.target.value)}
        />
      </div>
      {/* <div>{currentDay.format("YYYY-MM-DD")}</div> */}
      <div className="schedule">{Object.keys(schedule).map((item) => {
        return (
          <div>
            <h2>{item}</h2>
            {schedule[item].map((item) => {
              const itemName = item.name;
              const image = item.image_url;
              const id = item.id;
              return <ScheduleItem name={itemName} image={image} id={id} setUpdate={setUpdate}/>
            })}
          </div>
        )
      })}</div>
    </>
  );
}

export default Schedule;