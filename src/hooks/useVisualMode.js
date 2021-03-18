import { useState } from "react"

export default function useVisualMode(initial) {

const [mode, setMode] = useState(initial)
const [history, setHistory] = useState([initial])
//console.log("initial", initial, 'mode before', mode)

function transition(newValue, replace = false) {
  

    history.push(newValue)
    setMode(newValue)
 
}
function transition(newValue, replace = false) {
  if(replace) {
    setMode(newValue)
  } else {
    history.push(newValue)
    setMode(newValue)
  }
}

function back() {
  if (history.length <= 1){
    return
  } else {
    const getPreviousValue = history[history.length-2];
    history.pop()
    setMode(getPreviousValue)
  }
}

  return { mode, transition, back};
}


