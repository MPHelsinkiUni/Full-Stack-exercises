import { useState } from 'react'

const Name = (props) => {
  console.log("Printed", props.person)
  return (
    <li>{ props.person } { props.number }</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      alert(newName + ' is already added to phonebook.')
      return
    }

    const nameObject = {
      name: newName,
      number: String(newNumber),
      important: Math.random() > 0.5,
      id: String(persons.length + 1),
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    console.log(persons)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: 
          <input value={newName} onChange={handleNameChange}/></div>
        <div>number: 
          <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        <ul>
        {persons.map((person, index) =>  (<Name key={index} person={person.name} number={person.number}/>))}
        </ul>
    </div>
  )
}

export default App