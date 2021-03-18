import { useState } from "react"

export default function useVisualMode(initial) {

const [mode, setMode] = useState(initial)
const [history, setHistory] = useState([initial])
//console.log("initial", initial, 'mode before', mode)

function transition(newValue, replace = false) {
  setMode(newValue)
  if(replace) {
    console.log('replace???','history', history, 'value', newValue )
    setHistory(prev => [...prev.slice(0, -1), newValue])
    console.log('replace???','history After', history )
  } else {
    setMode(newValue)
    setHistory([...history, newValue])
  }
}

function back() {
  if (history.length > 1){
    setMode(history[history.length-2])
    setHistory(prev => prev.slice(0, prev.length-1))
  }
}

  return { mode, transition, back};
}


