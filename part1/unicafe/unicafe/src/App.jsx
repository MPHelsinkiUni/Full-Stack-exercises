import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [cont, setCont] = useState(0)

  const setToGood = (newValue) => {
    console.log('Good now', newValue)
    setGood(newValue)
    setToTotal(total + 1)
    setToCont(cont + 1)
  }

  const setToNeutral = (newValue) => {
    console.log('Neutral now', newValue)
    setNeutral(newValue)
    setToTotal(total + 1)
  }

  const setToBad = (newValue) => {
    console.log('Bad now', newValue)
    setBad(newValue)
    setToTotal(total + 1)
    setToCont(cont - 1)
  }

  const setToTotal = (newValue) => {
    console.log('Total now', newValue)
    setTotal(newValue)
  }

  const setToCont = (newValue) => {
    console.log('Cont- now', newValue)
    setCont(newValue)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setToGood(good + 1)}>
        good
      </button>
      <button onClick={() => setToNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setToBad(bad + 1)}>
        bad
      </button>

      <h1>statistics</h1>
      <p>good {good}<br/>
      neutral {neutral}<br/>
      bad {bad}<br/>
      all {total}<br/>
      average {cont/total} <br/>
      positive {(good/total) * 100} %<br/></p>
    </div>
  )
}

export default App