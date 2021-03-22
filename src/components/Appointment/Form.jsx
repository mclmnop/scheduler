/* name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function */
import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  //console.log('Inside form',props)
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("")

  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  const cancel  = () => {
    reset()
    props.onCancel()
  }
  const noSubmit = (event) => {
    event.preventDefault()
    console.log("On submit?",name, interviewer)
  }
  const validate = () => {
    console.log('Validate Input', name, interviewer, props.id)
    if(name === "") {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(name, interviewer)
    //props.onSave(name, interviewer, props.id)  <<< props.id looks unused, we'll see if everyting breaks
  }
 
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={noSubmit}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder= {props.name? props.name : "Enter Student Name"}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}