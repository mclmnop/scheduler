
import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  console.log('YOOOOOOO', props)
  return (
    <article className="appointment">
      {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Header time={props.time}/>}
    </article>
  );
}