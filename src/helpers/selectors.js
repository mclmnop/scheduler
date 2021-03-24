export function getAppointmentsForDay(state, day) {
  let appointmentsArray =[];
  state.days.map((weekday, index) => {
    if(weekday.name === day) {
      appointmentsArray = state.days[index].appointments;
    } else {
      return null;
    }
    return appointmentsArray;
  });

  const appointmentsForGivenDay = appointmentsArray.map((item, index) => {
    if(item === state.appointments[item].id) {
      return state.appointments[item];
    }
  })
  return appointmentsForGivenDay;
};

export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  const result = interview ? {
    student: interview.student,
    interviewer: interview.interviewer ? interviewers[interview.interviewer] : null 
  } : null
  return result;
};

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(eachDay => eachDay.name === day)
  if(!dayFound){
    return [];
  }  
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
};