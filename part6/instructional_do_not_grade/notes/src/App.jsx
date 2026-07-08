import NoteForm from './NoteForm'
import NoteList from './NoteList'
import VisibilityFilter from './VisibilityFilter'
import { useEffect } from 'react'
import noteService from './services/notes.js'

const App = () => {
  const { initialize } = useNoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
  <div>
    <NoteForm />
    <VisibilityFilter />
    <NoteList />
  </div>
  )
}

export default App
