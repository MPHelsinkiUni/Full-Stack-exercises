import { useCallback, useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = useCallback(() => {
    setValue('')
  }, [])

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useAnecdotes = () => {    
    const [anecdotes, setAnecdotes] = useState([])
    
    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (anecdote) => {
        const formattedAnecdote = await anecdoteService.create(anecdote)
        setAnecdotes(anecdotes.concat(formattedAnecdote))
    }

    const removeAnecdote = async (id) => {
        await anecdoteService.remove(id)
        setAnecdotes(anecdotes => anecdotes.filter(anecdote => anecdote.id !== id))
    }

    return {
        anecdotes,
        addAnecdote,
        removeAnecdote
    }    
}
