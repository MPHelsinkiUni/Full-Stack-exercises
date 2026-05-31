

require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

// Deal with console outputs
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

// Deal with handling functions
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)


// App proper
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const length = persons.length
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }    
    })
    .catch(error => {next(error)})
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const contact = request.body

  if (!contact.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!contact.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = {
    name: contact.name,
    number: contact.number,
  }

  person.save().then(savedContact => {response.json(savedContact)})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
