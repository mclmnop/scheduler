import { useState } from "react";
import axios from "axios";

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

  return {state, setState, setDay, bookInterview, cancelInterview}



}