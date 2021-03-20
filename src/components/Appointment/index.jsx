
import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log('appointment index', props.interview)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, id) {
    const interview = {
      student: name,
      interviewer
    };
    //console.log('state inside save', state)
    //console.log('INTERVIEWCONTENT', interview)
    transition(SAVE)
    props.bookInterview(id, interview)
     .then(() => transition(SHOW))
    //transition(SHOW)
  }

/*   function getConfirmPrompt() {
    transition(CONFIRM)
    return <
  } */
  function deleteInterview(appointmentId) {
    transition(DELETING)
    props.cancelInterview(appointmentId)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          // student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          appointmentId={props.id}
          //interviewer={props.interviewer}
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
      {mode === SAVE && (
        <Status
          message="saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Do you really want to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
          appointmentId={props.id}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer ? props.interview.interviewer.id : props.interview}
        onCancel={back}
        onSave={save}
        id={props.id}
        />
      )}
    </article>
  );
}