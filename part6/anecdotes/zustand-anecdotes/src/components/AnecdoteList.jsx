import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const {vote} = useAnecdoteActions()

    const voteId = id => {
        vote(id)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteId(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
