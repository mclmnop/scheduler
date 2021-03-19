/* function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
} */

/* const interviewers = {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
} */

export function getAppointmentsForDay(state, day) {
  let appointmentsArray =[]
  state.days.map((weekday, index) => {
    if(weekday.name === day) {
      appointmentsArray = state.days[index].appointments;
    } else {
      return null
    }
  });

  const appointmentsForGivenDay = appointmentsArray.map((item, index) => {
    if(item === state.appointments[item].id) {
      return state.appointments[item]
    }
  })
  return appointmentsForGivenDay;
}



/* {
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1
  }
} */

//wanted result
/* {  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
} */

export function getInterview(state, interview) {
  //console.log('data received', state, 'interview', interview)
  const interviewers = state.interviewers;
  const result = interview ? {
    student: interview.student,
    interviewer: interview.interviewer ? interviewers[interview.interviewer] : null 
  } : null
  //console.log('result', result)
  return result;
}

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(eachDay => eachDay.name === day)
  if(!dayFound){
    return [];
  }
  console.log ('dayfound 🤡', dayFound.interviewers, 'var input', day, 'state', state)

  
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  console.log ('interviewers 💩', interviewers, state.interviewers)
 
  return interviewers;
}