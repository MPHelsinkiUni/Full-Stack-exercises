const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://vothedat_db_user:${password}@cluster0.zz4fvgp.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const bloggy = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 1,
    },
    {
      title: 'My name is Slimmy',
      author: 'Marshall Mathers',
      url: 'https://hell.no.pdf',
      likes: 2,
    },
    {
      title: 'Earthsea is mega underrated',
      author: 'Ursula K. Le Guin',
      url: 'https://uklg.ca/blog/461',
      likes: 4,
    },
    {
      title: 'Fuck you',
      author: 'Harlan Ellison',
      url: 'https://he.he',
      likes: 8,
    },
    {
      title: 'Grifter 30-year-old yells at cloud again',
      author: 'Dude is in a sex offender list',
      url: 'https://www.youtube.com/watch?v=godhateswome',
      likes: 16,
    },
    {
      title: 'Reaction Youtuber 124',
      author: 'Who is this',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEf',
      likes: 32,
    },
    {
      title: 'Reaction Youtuber 125',
      author: 'Who is this #2',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEg',
      likes: -33,
    }]

Promise.all(
  bloggy.map(blog => new Blog(blog).save())
)
  .then(() => {
    console.log('all blogs saved!')
    mongoose.connection.close()
  })

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})



