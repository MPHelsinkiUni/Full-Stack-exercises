import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Blog from './Blog'
import Success from './Success'
import Error from './Error'
import LoginForm from './Login'
import Togglable from './Togglable'
import loginService from '../services/login'
import blogService from '../services/blogs'


const BlogList = ({ blogs }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
      }, [])

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
        <h2>Recent blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                    <Blog user={user} key={blog.id} blog={blog} likeUpdate={updateBlog} removeBlog={removeBlog}/>
        ))}
        </div>
    )

    return (
      <div>
        <h1>Blogs</h1>
        {blogsList()}
      </div>
    )
}

export default BlogList
