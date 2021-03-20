import { useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  const setDay = (newDay) => {
    setState({...state, day: newDay})
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        console.log('POUT POUT', res) 
        setState({...state, appointments})
      })
    }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, {interview : 'null'})
      .then(res => {
        setState({...state, appointments})
      })
  }

// Where is the value of "spots" stored for each day? >>> days.spots
// When should that value change? >>>> when a new spot is created or one cancelled
// How can we calculate how many spots should be available? for each appointments in a day, if !appointments.interview, + 1
  const countSpots = (currentDay) => {
    //setState({...state, day: newDay})
    //find appointement for the day
    const appointmentsForCurrentDay = getAppointmentsForDay(state, "Monday")
    console.log('Les spots aujourd\'hui?',appointmentsForCurrentDay)
    let spotCount = 0
    appointmentsForCurrentDay.forEach((item) => {
      if (!item.interview) {
        spotCount++
      }
    })
    console.log('count', spotCount)
    return spotCount
  }
  const updateSpots = () => {
    //setState({...state, day: newDay})
  }




  return {state, setState, setDay, bookInterview, cancelInterview, countSpots}



}