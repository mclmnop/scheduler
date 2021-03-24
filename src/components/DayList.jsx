import React from "react";
import DayListItem from "components/DayListItem";

/* Props:
Takes three props>>
days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday" */


export default function DayList(props) {
  const dayArray = props.days;
  const days = dayArray ? dayArray.map((day, index) => {
    return (
    <DayListItem 
    key={index} 
    name ={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    full={day.spots === 0}
    setDay={() => props.setDay(day.name)}
    />
    )
  }) : "no data";
  return (
    <ul>
      {days}
    </ul> 
  );
}