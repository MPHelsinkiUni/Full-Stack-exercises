import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleLikesChange = event => {
    setLikes(event.target.value)
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setUrl('')
      setTitle('')
      setLikes('')
      setAuthor('')
      } 
    )
  }

  const logOut = async event => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('logout issue. Please bother your local admin')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div><label>Username<input type="text" value={username} onChange={handleUsernameChange}/></label></div>
        <div><label>Password<input type="password" value={password} onChange={handlePasswordChange}/></label></div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h1>
        Post new blog
      </h1>
      <form onSubmit = {addBlog}>
        <div><label>Title<textarea id="title" value={title} onChange={handleTitleChange}/></label></div>
        <div><label>Author<input type="text" id="author" value={author} onChange={handleAuthorChange}/></label></div>
        <div><label>Url<input type="url" id="url" value={url} onChange={handleUrlChange}/></label></div>
        <div><label>Likes<input type="number" id="likes" value={likes} onChange={handleLikesChange}/></label></div>
        <button type="submit">send</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <h1>Recent blogs</h1>
      {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
    return (
      <div>
        <Notification message={errorMessage} />
        {!user && loginForm()}
        {user && (
          <div>
            <h1>Blogs</h1>
            <p>{user.name} logged in</p>
            <button onClick={logOut} name="logout" type="button">Logout</button>
            {blogForm()}
            {blogsList()}
          </div>
          )}
      </div>
    )
  }

export default App
