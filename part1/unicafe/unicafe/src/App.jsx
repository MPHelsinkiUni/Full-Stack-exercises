import { useState } from 'react'

const Statistics = (props) => {
  if (props.totalStat === 0) {
    return (
      <div>
      <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={props.goodStat}/>
        <StatisticLine text="neutral" value={props.neutralStat}/>
        <StatisticLine text="bad" value={props.badStat}/>
        <StatisticLine text="all" value={props.totalStat}/>
        <StatisticLine text="average" value={Number(props.contStat/props.totalStat).toFixed(1)}/>
        <StatisticLine text="positive" value={Number((props.goodStat/props.totalStat) * 100).toFixed(1)} unit='%'/>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td> <td>{props.value} {props.unit}</td>
      </tr>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)


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
      <Button onClick={() => setToGood(good + 1)} text='good'/>
      <Button onClick={() => setToNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setToBad(bad + 1)} text='bad'/>
      <Statistics goodStat={good} neutralStat={neutral} badStat={bad} totalStat={total} contStat={cont}/>

    </div>
  )
}

export default App