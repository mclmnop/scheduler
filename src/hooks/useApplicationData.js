import { useState } from "react";
import axios from "axios";
//import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
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
/*     const days = state.days.map(function (day) {
      if (day.name === state.day && !state.appointments[id].interview) {
        day.spots--;
      } 
      return day;
    }); */
    const days = updateSpots(state.day, state.days, appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({...state, days, appointments})
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
    const days = updateSpots(state.day, state.days, appointments)
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, days, appointments})
      })
  }

// Where is the value of "spots" stored for each day? >>> days.spots
// When should that value change? >>>> when a new spot is created or one cancelled
// How can we calculate how many spots should be available? for each appointments in a day, if !appointments.interview, + 1
//
  const countSpots = (currentDayObj, appObj) => {
    //setState({...state, day: newDay})
    //find appointement for the day

    let spotCount = 0
    currentDayObj.appointments.forEach((item) => {
      if(!appObj[item].interview) {
        spotCount++
      }
    })
    //console.log('count', spotCount)
    return spotCount
  }
  const updateSpots = (dayName, days, appointments) => {
    //let newDaysArray=[]
    //setState({...state, day: newDay})
    const currentDay = days.find((item) => item.name === dayName)
    //console.log( 'current day in update spots', currentDay,   "state from useApplicationData", state )
    // const spotsLeft = countSpots(currentDay, appointments);
    //console.log('INPUUUTTT 🤒', dayName, days, typeof(appointments))
    const spotsLeft = countSpots(currentDay, appointments);
    //console.log('spots left??', spotsLeft)
    const newDaysArray = days.map((item) => {
      if (item.name === dayName) {
        return{...item, spots:spotsLeft}
      } else {
        return item
      }
    })
    //console.log('New days array', newDaysArray)
    return newDaysArray
  }
  return {state, setState, setDay, bookInterview, cancelInterview}
}
