import { useCounterControls } from "./store"

const Buttons = () => {
  const { goodUp, neutralUp, badUp, zero } = useCounterControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodUp}>good</button>
      <button onClick={neutralUp}>neutral</button>
      <button onClick={badUp}>bad</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Buttons
