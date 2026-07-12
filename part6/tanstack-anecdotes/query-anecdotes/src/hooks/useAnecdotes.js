import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotify from './useNotify'

export const useAnecdotes = () => {
    const { alert, empty } = useNotify()
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.invalidateQueries(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            alert(`anecdote '${newAnecdote.content}' added`)
            setTimeout(() => {empty()}, 5000)
        },
        onError: (error) => {
            alert(`${error}`)
            setTimeout(() => {empty()}, 5000)
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            alert(`anecdote '${updatedAnecdote.content}' added`)
            setTimeout(() => {empty()}, 5000)
        },
        onError: (error) => {
            alert(`${error}`)
            setTimeout(() => {empty()}, 5000)
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        voteAnecdote: (anecdote) => {
            updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        }
    }
}
