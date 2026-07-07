import { create } from 'zustand'

import Display from './Display.jsx'
import Controls from './Controls'

const App = () => {
  return (
    <div>
      <Display />
      <Controls />
    </div>
  )
}

export default App
