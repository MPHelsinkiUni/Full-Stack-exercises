import { useState, useEffect } from 'react'
import Service from './services/comms'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Success from './components/Success'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearch, setShowSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    Service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)      
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()
  )
    if (nameExists) {
      const confirmUpdate = window.confirm(
        newName + ' is already added to phonebook. Replace the old number with a new one?'
      )
    
      if (!confirmUpdate) {
        return
      }

      const updatedObject = {
        ...nameExists,
        number: String(newNumber)
      }

      Service
      .update(nameExists.id, updatedObject)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== nameExists.id
              ? person
              : returnedPerson
          )
        )
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          'The person data was modified.'
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error.response.data.error)
      })
      return
    }

    const nameObject = {
      name: newName,
      number: String(newNumber),
      id: persons.length + 1,
    }
    Service
      .create(nameObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))        
        setNewName('')   
        setNewNumber('')
        setSuccessMessage(
          'The person data was added.'
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error.response.data.error)
      })

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

  const namesToShow = (showSearch === '') ? persons : persons.filter(persons => persons.name.includes(showSearch) === true) // name_filter will be implemented in form

  const removeName = (id, person) => {
    const newList = persons.filter((question) => question.id !== id)

    const confirmDelete = window.confirm(
        `Delete ${person || 'this person'}?`
      )
      if (!confirmDelete) {
        return
      }

    console.log('delete', id)
    Service
    .removal(id)
    .then(response => {
      console.log(response)
      setPersons(newList)      
      setNewName('')   
      setNewNumber('')
    })
    .catch(error => {
        setErrorMessage(
          `The name was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })

    setPersons(person => person.filter(p => p.id !== id))      
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={errorMessage} />
      <Success message={successMessage} />

      <input value={showSearch} onChange={handleSearchChange}/>

      <h2>Add new contact</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>

      <h2>Numbers</h2>
      
      <Persons removeName={removeName} namesToShow={namesToShow} />
    </div>
  )
}

export default App
