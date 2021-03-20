import { useState } from "react"

export default function useVisualMode(initial) {

const [mode, setMode] = useState(initial)
const [history, setHistory] = useState([initial])
//console.log("initial", initial, 'mode before', mode)

function transition(newValue, replace = false) {
  setMode(newValue)
  if(replace) {
    //console.log('replace???','history', history, 'value', newValue, 'mode', mode )
    setHistory(prev => [...prev.slice(0, -1), newValue])
    //console.log('history After', history )
  } else {
    //console.log('replace Pas???','history', history, 'value', newValue, 'mode', mode)
    setMode(newValue)
    setHistory(prev => [...prev, newValue])
    // setHistory([...history, newValue])
    //console.log('cochonneri?',[...history, newValue, "patate"], 'mode', mode)
    //console.log('apres replace pas','history', history, 'value', newValue, 'mode', mode )
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


