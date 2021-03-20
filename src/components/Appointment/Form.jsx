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
  const save = () => {
    console.log('SAVE', name, interviewer, props.id)
    props.onSave(name, interviewer, props.id)
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={noSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder= {props.name? props.name : "Enter Student Name"}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}