import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'

import Error from './components/Error'
import Success from './components/Success'

import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

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
          <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div><label>Username<input type="text" value={username} onChange={handleUsernameChange}/></label></div>
              <div><label>Password<input type="password" value={password} onChange={handlePasswordChange}/></label></div>
              <button type="submit">login</button>
            </form>
          </div>
        </Togglable>
      </div>
    )
  }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
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

  const blogsList = () => (
    <div>
      <h1>Recent blogs</h1>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                <Blog user={user} key={blog.id} blog={blog} likeUpdate={updateBlog} removeBlog={removeBlog}/>
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
