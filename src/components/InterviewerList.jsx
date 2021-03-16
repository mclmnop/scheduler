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
    return (
    <InterviewerListItem 
    key={index} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer} 
    setInterviewer={event => props.setInterviewer(interviewer.id)}/>)
  }) : "Nope"
  return (
    <section className="interviewers">
      {interviewers}
    </section>
  );
}