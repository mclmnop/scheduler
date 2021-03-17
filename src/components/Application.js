import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Abigail Simpson",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Mike Allard",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Sophie Belleau",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  },
];

export default function Application(props) {
  
    let [ day, setDay ] = useState("Monday")
    let [ days, setDays ] = useState([])
    let [ interviewer, setInterviewer ] = useState("")

  useEffect(() => {
    axios
    .get("/api/days")
    .then((response) => {
      setDays(response.data);
      //console.log('response in application', response);
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  },[])

  //console.log('Days inApplication', days)
  const selectDay = (day) => {
    setDay(day)
  }
  const selectInterviewer = (id) => {
    setInterviewer(id)
  }
  let schedule = appointments.map((appointment) => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      />
    )
  })


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
        {schedule}
      </section>
    </main>
  );
}
