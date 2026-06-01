const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = String(process.argv[4])

const url = `mongodb+srv://vothedat_db_user:${password}@cluster0.zz4fvgp.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 5,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      required: true
    },
  })

const Person = mongoose.model('Person', personSchema)

/*
const person = new Person(
    { 
    "name": name, 
    "number": number
    })

person.save().then(result => {
    loggy = 
console.log('added', name, 'number', number, 'to phonebook')
mongoose.connection.close()
})
*/


Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})

