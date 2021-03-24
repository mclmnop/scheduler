import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';

/* Props:
interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id */

export default function InterviewerList(props) {
  const interviewersArray = props.interviewers;
  const interviewers = interviewersArray ? interviewersArray.map((interviewer, index) => {
    return (
    <InterviewerListItem 
      key={index} 
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onChange(interviewer.id)}
    />)
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
};