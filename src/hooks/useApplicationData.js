import { useState } from "react";
import axios from "axios";

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

  const countSpots = (currentDayObj, appObj) => {
    let spotCount = 0;
    currentDayObj.appointments.forEach((item) => {
      if(!appObj[item].interview) {
        spotCount++
      }
    })
    return spotCount;
  };

  const updateSpots = (dayName, days, appointments) => {
    const currentDay = days.find((item) => item.name === dayName)
    const spotsLeft = countSpots(currentDay, appointments);
    const newDaysArray = days.map((item) => {
      if (item.name === dayName) {
        return{...item, spots:spotsLeft}
      } else {
        return item
      }
    })
    return newDaysArray;
  }
  return {state, setState, setDay, bookInterview, cancelInterview};
}
