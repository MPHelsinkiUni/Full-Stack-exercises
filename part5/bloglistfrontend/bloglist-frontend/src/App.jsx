import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Success from './components/Success'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
      setSuccessMessage('Login successful')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const logOut = async event => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
      setSuccessMessage('Logout successful')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Logout issue. Please bother your local admin')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

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
        <Error message={errorMessage} />
        <Success message={successMessage} />
        {!user && loginForm()}
        {user && (
          <div>
            <h1>Blogs</h1>
            <p>{user.name} logged in</p>
            <button onClick={logOut} name="logout" type="button">Logout</button>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
            {blogsList()}
          </div>
          )}
      </div>
    )
  }

export default App
