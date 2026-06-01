const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://vothedat_db_user:${password}@cluster0.zz4fvgp.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Length of name must be at least 3, got {VALUE}'],
    required: [true, 'Please do not insert phone numbers with no owner']
  },
  number: {
    type: String,
    minLength: [8, 'Length of phone number must be at least 8, got {VALUE}'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Please do not insert names with no phone number']
  },
})

const Person = mongoose.model('Person', personSchema)

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

