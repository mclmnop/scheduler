import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";


/* const appointments = [
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
]; */

export default function Application(props) {
  
/*     let [ day, setDay ] = useState("Monday")
    let [ days, setDays ] = useState([])
    let [ interviewer, setInterviewer ] = useState("") */
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewer: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  //console.log('👺', state)

  
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),      
    ])
    /*     axios
    .get("/api/days") */
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  },[])
  
  
  const setDay = (newDay) => {
    setState({...state, day: newDay})
  }
  
  const setInterviewer = (id) => {
    setState({...state, interviewer:id })
  }
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  let schedule = dailyAppointments.map((appointment) => {
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
          days={state.days}
          day={state.day}
          setDay={setDay}
      />
      </nav>
      <div>
        <InterviewerList
          setInterviewer={setInterviewer}/>
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
