//Takes three props>>
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  //let day = props.days.map((day) => day)
  //const { dayArray } = props.days
  const dayArray = props.days
  console.log('👗', dayArray[0] )
  
/*   let days = dayArray ? dayArray.map((day, index) => {
    return (<DayListItem key={index} name ={day.name} spotd ={day.spots} selected={day.name === props.day} setDay={props.setDay}/>)
  }) : "There is no data here" */
  let days = dayArray ? dayArray.map((day, index) => {
    return (<DayListItem key={index} name ={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay}/>)
  }) : "There is no data here"
  
  console.log("🦺", days[0].name)
  return (
    <ul>
      {days}
    </ul> 
  );
}