
import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  console.log('YOOOOOOO dans appointment index', props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, id) {
    const interview = {
      student: name,
      interviewer
    };
    //console.log('state inside save', state)
    props.bookInterview(id, interview)
    transition(SHOW)
  }


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers ={props.interviewers}
        onCancel = {back}
        onSave={save}
        id={props.id}
        />
      )}
    </article>
  );
}