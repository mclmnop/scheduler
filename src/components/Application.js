import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  let [ day, setDay ] = useState("Monday")
  let [ interviewer, setInterviewer ] = useState("")
  const selectDay = (day) => {
    setDay(day)
  }
  const selectInterviewer = (id) => {
    setInterviewer(id)
  }
  console.log('CurrentSelected Day👉', day, 'setDay', selectDay)
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
          days={days}
          day={day}
          setDay={selectDay}
      />
      </nav>
      <div>
        <InterviewerList
          setInterviewer={selectInterviewer}/>
      </div>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
