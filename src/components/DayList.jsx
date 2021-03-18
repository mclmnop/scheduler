//Takes three props>>
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const dayArray = props.days
  //console.log('days??', dayArray)
  let days = dayArray ? dayArray.map((day, index) => {
    //console.log('Day Name', day.name, 'Props day', props.day)
    return (
    <DayListItem 
    key={index} 
    name ={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    full={day.spots === 0}
    setDay={event => props.setDay(day.name)}/>
    )
  }) : "There is no data here"
  
  return (
    <ul>
      {days}
    </ul> 
  );
}