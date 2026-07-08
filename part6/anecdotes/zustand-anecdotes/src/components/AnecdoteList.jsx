import { useAnecdotes, useAnecdoteActions, useQuery } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const term = useQuery()
    const filterAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(term.toLowerCase()))
    const sortedAnecdotes = filterAnecdotes.toSorted((a, b) => b.votes - a.votes)

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
