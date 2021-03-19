import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewer: 0,
    interviewers  : {},
    appointments: {}
  });
  //console.log('👺', state)
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),      
      axios.get("/api/interviewers"),      
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  },[])
  //console.log('👺👺', state)
  
  
  const setDay = (newDay) => {
    setState({...state, day: newDay})
  }
  
  const setInterviewer = (id) => {
    setState({...state, interviewer:id })
  }
  
  const interviewersForToday = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  function bookInterview(id, interview) {
    console.log('Inside book interview', id, interview);
  }

  function save(name, interviewer, id) {
    const interview = {
      student: name,
      interviewer
    };
    console.log('state inside save', state)
    bookInterview(id, interview);

  }
/*   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  } */

  let schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForToday}
        bookInterview={bookInterview}
        onSave={save}
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
{/*       <div>
        <InterviewerList
          setInterviewer={setInterviewer}/>
      </div> */}
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
