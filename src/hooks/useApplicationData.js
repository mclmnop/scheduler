import { useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
    spots: 0
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
   const patate = updateSpots(state.day, state.days, state.appointments)
    console.log('DAYS inside bookInterview', state.days, 'state se rend tu?', state, "New days inside book interview?", patate)

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
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
//
  const countSpots = (state, currentDay) => {
    //setState({...state, day: newDay})
    //find appointement for the day
    const appointmentsForCurrentDay = getAppointmentsForDay(state, currentDay)
    console.log('Les spots aujourd\'hui?',appointmentsForCurrentDay, state.spots)
    let spotCount = 0
    appointmentsForCurrentDay.forEach((item) => {
      if (!item.interview) {
        spotCount++
      }
    })
    console.log('count', spotCount)
    return spotCount
  }
  const updateSpots = (dayName, days, appointments) => {
    //setState({...state, day: newDay})
    // const currentDay = days.find((item) => item.name === dayName)
    const currentDay = days.find((item) => item.name === dayName)
    console.log('current day in update spots', currentDay, "wtf state", state)
    const spotsLeft = countSpots(state, dayName);
    // const spotsLeft = countSpots(state, dayName);
    console.log('spots left??', spotsLeft)
    const newDaysArray = days.map((item) => {
      if (item.name === dayName) {
        return{...item, spots:spotsLeft}
      } else {
        return item
      }
    })
    console.log('New days array', newDaysArray)
    return newDaysArray
  }




  return {state, setState, setDay, bookInterview, cancelInterview, countSpots, updateSpots}



}