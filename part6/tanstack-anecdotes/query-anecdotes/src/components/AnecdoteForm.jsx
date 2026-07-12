import useNotify from '../hooks/useNotify'

const AnecdoteForm = ({ addAnecdoteToServer }) => {
  const { alert, empty } = useNotify()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await event.target.reset()
    await addAnecdoteToServer(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
