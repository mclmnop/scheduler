import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";

/* Props:
name:String the name of the day
spots:Number the number of spots remaining
selected:Boolean true or false declaring that this day is selected
setDay:Function accepts the name of the day eg. "Monday", "Tuesday" */

const formatSpots = (spotsNumber) => {
  let message = ""
  if (spotsNumber === 1) {
    message = "1 spot remaining"
  } else if (spotsNumber === 0) {
    message = "no spots remaining"
  } else {
  message = `${spotsNumber} spots remaining`
  }
  return message;
};

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const spotsFormatted = formatSpots(props.spots);
  return (
    <li onClick={props.setDay} className={dayClass} data-testid="day">
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{spotsFormatted}</h3>
    </li>
  );
};