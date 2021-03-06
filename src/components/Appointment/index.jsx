
import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
      .then(() => {
          transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      });
  };

  function deleteInterview(appointmentId) {
    transition(DELETING, true)
    props.cancelInterview(appointmentId)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true) 
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          appointmentId={props.id}
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
      {mode === ERROR_SAVE && (
        <Error
          message={"there was an error"}
          onClose={back}
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
      {mode === ERROR_DELETE && (
        <Error
          message="Unable to delete this file"
          onClose={back}
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