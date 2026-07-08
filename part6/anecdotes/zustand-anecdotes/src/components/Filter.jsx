import { useAnecdoteActions, useQuery } from '../store'

const Filter = () => {
  const { query } = useAnecdoteActions()
  const handleChange = (event) => {
    query(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
