import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useQuery, useNotification, useAnecdoteActions } from '../store'
import AnecdoteList from '../components/AnecdoteList'

beforeEach(() => {
    useAnecdoteStore.setState({ 
        anecdotes: [],
        term: '',
        notification: ''
    })
    vi.clearAllMocks()
})

describe('Hooks', () => {
    it('useAnecdotes initially starts with anecdotes returned by the backend', async () => {
        const mockAnecdotes = [
            {
                "content": "If it hurts, do it more often",
                "id": "47145",
                "votes": 2
            },
            {
                "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
                "id": "69581",
                "votes": 3
            },
            {
                "content": "Premature optimization is the root of all evil.",
                "id": "25170",
                "votes": 1
            },
            {
                "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                "id": "98312",
                "votes": 0
            }
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())
        
        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())

        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })
    
    it('Component displaying anecdotes receives it sorted by votes descending', async () => {
        const { result } = renderHook(() => useAnecdotes())
        const sortedVotes = result.current.map(a => a.votes).sort((a, b) => b - a)
        expect(result.current.map(a => a.votes)).toEqual(sortedVotes)
    })
    
    it('Component receives a properly filtered list of anecdotes', async () => {
        useAnecdoteStore.setState({
            anecdotes: [
                {
                    "content": "If it hurts, do it more often",
                    "id": "47145",
                    "votes": 2
                },
                {
                    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
                    "id": "69581",
                    "votes": 3
                },
                {
                    "content": "Premature optimization is the root of all evil.",
                    "id": "25170",
                    "votes": 1
                },
                {
                    "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                    "id": "98312",
                    "votes": 0
                }
            ],
            term: 'hurts',
            notification: ''
        })
    
        const { result } = renderHook(() => useAnecdotes())
        console.log(result)
        expect(result.current).toEqual([
            {
                "content": "If it hurts, do it more often",
                "id": "47145",
                "votes": 2
            }
        ])
    })

    it('Voting increases number of votes for an anecdote', async () => {
        const mockAnecdotes = [
                {
                    "content": "If it hurts, do it more often",
                    "id": "47145",
                    "votes": 2
                },
                {
                    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
                    "id": "69581",
                    "votes": 3
                },
                {
                    "content": "Premature optimization is the root of all evil.",
                    "id": "25170",
                    "votes": 1
                },
                {
                    "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                    "id": "98312",
                    "votes": 0
                }
            ]
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes,
            term: '',
            notification: ''
        })

        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())
        
        await act(async () => {
            await result.current.initialize()
            await result.current.vote('47145')
            await result.current.vote('47145')
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        console.log(result)

        expect(anecdotesResult.current).toEqual([
                {
                    "content": "If it hurts, do it more often",
                    "id": "47145",
                    "votes": 4
                },
                {
                    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
                    "id": "69581",
                    "votes": 3
                },
                {
                    "content": "Premature optimization is the root of all evil.",
                    "id": "25170",
                    "votes": 1
                },
                {
                    "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                    "id": "98312",
                    "votes": 0
                }
            ])

    })
})
