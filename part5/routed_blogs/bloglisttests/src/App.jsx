import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'

import Error from './components/Error'
import Success from './components/Success'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import Detail from './components/Detail'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

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
      setSuccessMessage(null)
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
      setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Logout issue. Please bother your local admin')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async blogObject => {
    const newBlog = await blogService.create(blogObject)
    const newerBlog = {
      ...newBlog,
      user: user
    }
    setBlogs(blogs.concat(newerBlog))
  }

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject)
    
    const updatedBlog = {
      ...returnedBlog,
      user: blogs.find(blog => blog.id === id).user
    }
    
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const removeBlog = async (blogObject) => {
    const newList = blogs.filter((blog) => blog.id !== blogObject.id)

    const confirmDelete = window.confirm(
        `Delete ${blogObject.title}?`
      )
      if (!confirmDelete) {
        return
      }

    await blogService
    .removal(blogObject.id)
    .then(response => {
      setBlogs(newList)
    })
    .catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })

    setBlogs(blogs => blogs.filter(blog => blog.id !== blogObject.id))      
  }

  const padding = {
    padding: 5
  }
   
  return (
    <div>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      <Router>
        <div>
          <Link style={padding} to="/">Blogs</Link>
          {!user && <Link style={padding} to="/login">Login</Link>}
          {user && <Link style={padding} to="/create">Create blog</Link>}
          {user && <button onClick={logOut} name="logout" type="button">Logout</button>}
        </div>
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} user={user} updateBlog={updateBlog} removeBlog={removeBlog} setBlogs={setBlogs} setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />} />
          <Route path="/blogs/:id" element={<Detail blogs={blogs} user={user} updateBlog={updateBlog} removeBlog={removeBlog} setBlogs={setBlogs} setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />} />
          {!user && <Route path="/login" element={<LoginForm handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} username={username} password={password} /> } />}
          <Route path="/create" element={<BlogForm createBlog={addBlog} setErrorMessage={setErrorMessage}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
    
  }

export default App
