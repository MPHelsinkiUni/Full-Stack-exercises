import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearch, setShowSearch] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons') // Get something from here
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      }) // Then with the response, take that data, set it as persons through SetPersons
  }, [])
  console.log('render', persons.length, 'persons')

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

  const handleSearchChange = (event) => {
    console.log('Search', event.target.value)
    setShowSearch(event.target.value)
  }

  const namesToShow = (showSearch === '')
    ? persons
    : persons.filter(persons => persons.name.includes(showSearch) === true) // name_filter will be implemented in form

  return (
    <div>
      <h2>Phonebook</h2>

      <input value={showSearch} onChange={handleSearchChange}/>

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>

      <h3>Numbers</h3>
      
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App

// npm run server and npm run dev necessary
