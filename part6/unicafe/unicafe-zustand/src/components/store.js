import { create } from 'zustand'

const useCounterStore = create(set => ({
    counters: {
        good: 0,
        neutral: 0,
        bad: 0,
    },
    actions: {
        goodUp: () => set(state => ({ counters: {...state.counters, good: state.counters.good + 1} })),
        neutralUp: () => set(state => ({ counters: {...state.counters, neutral: state.counters.neutral + 1} })),
        badUp: () => set(state => ({ counters: {...state.counters, bad: state.counters.bad + 1} })),
        zero: () => set(() => ({ counters: { good: 0, neutral: 0, bad: 0 }})),
    } 
}))

// the hook functions that are used elsewhere in app
export const useCounter = () => useCounterStore(state => state.counters)
export const useCounterControls = () => useCounterStore(state => state.actions)
