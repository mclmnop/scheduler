import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
  
  const { 
    state, 
    setState, 
    setDay, 
    bookInterview, 
    cancelInterview, 
    updateSpots
  } = useApplicationData();
  //console.log('👺', state)
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),      
      axios.get("/api/interviewers"),      
    ])
    .then((all) => {
      //console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  },[])
  //console.log('👺👺', state)
  
  const interviewersForToday = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);

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
        onSave={props.onSave}
        cancelInterview={cancelInterview}
        state={state}
      />
      )
  })
  console.log('State from aplication before update', state.appointments)
  updateSpots(state.day, state.days, state.appointements )
  console.log('State from aplication after update', state.appointments)
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
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
