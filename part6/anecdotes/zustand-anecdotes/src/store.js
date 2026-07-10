import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  term: '',
  notification: '',
  actions: {
    vote: async id => {
      const anecdoteToUpdate = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(
        id, {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      )
      set(state => ({anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
        ) 
      }))
    },
    add: async value => {
      const newAnecdote = await anecdoteService.createNew(value)
      set(state => ({ anecdotes: state.anecdotes.concat(asObject(newAnecdote)) }))
    },
    query: value => set(() => ({ term: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll() 
      set(() => ({ anecdotes }))
    },
    setNotification: async value => {
      set({ notification: value })
      setTimeout(() => {
        set({ notification: '' })
      }, 5000)
    },
    remove: async value => {
      const deleteAnecdote = await anecdoteService.remove(value)
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== value) }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filterTerm = useAnecdoteStore((state) => state.term)
  if (filterTerm === '') {return anecdotes} else {return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filterTerm.toLowerCase())
    )
  }
}
export const useQuery = () => useAnecdoteStore((state) => state.term)
export const useNotification = () => useAnecdoteStore((state) => state.notification)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
