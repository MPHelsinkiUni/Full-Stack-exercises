import { useAnecdotes, useAnecdoteActions, useQuery } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const term = useQuery()
    const filterAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(term.toLowerCase()))
    const sortedAnecdotes = filterAnecdotes.toSorted((a, b) => b.votes - a.votes)

    const { vote, setNotification, remove } = useAnecdoteActions()

    const voteId = anecdote => {
        vote(anecdote.id)
        setNotification(`You voted for blog ${anecdote.content}`)
    }

    const tearId = anecdote => {
        if (anecdote.votes !== 0) {
            setNotification(`This anecdote cannot be removed as it has a vote.`)
        } else {
            remove(anecdote.id)
            setNotification(`The anecdote ${anecdote.content} has been deleted`)
        }
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteId(anecdote)}>vote</button>
                    <button onClick={() => tearId(anecdote)}>delete</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
