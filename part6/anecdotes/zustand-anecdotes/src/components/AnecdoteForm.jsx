import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        await add(anecdote)
        event.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
