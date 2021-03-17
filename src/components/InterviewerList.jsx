import React from "react";
import classnames from 'classnames';
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem'

/* interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id */

export default function InterviewerList(props) {
  const interviewerListClass = classnames("interviewers", {
    "interviewers__item--selected": props.selected
  });
  const interviewersArray = props.interviewers;
  const interviewers = interviewersArray ? interviewersArray.map((interviewer, index) => {
    console.log('Interviewer Name', interviewer.name, 'Props value', props.value, 'id', interviewer.id)
    return (
    <InterviewerListItem 
    key={index} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    /* selected={interviewer.id === props.id} */
    selected={interviewer.id === props.value}
   /*  setInterviewer={(event) => props.setInterviewer(interviewer.id)}/>) */
    setInterviewer={(event) => props.onChange(interviewer.id)}/>)
  }) : "Nope"
  return (
    <main>
      <section className="interviewers__header">
        Interviewer
      </section>
      <section className="interviewers__list">
        {interviewers}
      </section>
    </main>
  );
}