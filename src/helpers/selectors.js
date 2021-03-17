/* function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
} */

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  //console.log('state days', state.days, 'day', day)
  let appointmentsArray =[]
  state.days.map((weekday, index) => {
    if(weekday.name === day) {
      //console.log('cest tu ca?',state.days[index].appointments, 'ou ca?', weekday.appointments)
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
  
  //console.log('appointmentsArray', appointmentsArray, 'that day', appointmentsForGivenDay)
}