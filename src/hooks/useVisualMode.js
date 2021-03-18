import { useState } from "react"

export default function useVisualMode(initial) {

const [mode, setMode] = useState(initial)
const [history, setHistory] = useState([initial])
//console.log("initial", initial, 'mode before', mode)

function transition(newValue) {
  history.push(newValue)
  setMode(newValue)
}

function back() {
  const getPreviousValue = history[history.length-2];
  history.pop()
  setMode(getPreviousValue)
}

  return { mode, transition, back};
}


