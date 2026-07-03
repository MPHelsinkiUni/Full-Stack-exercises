import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Detail = ({ blogs, user, updateBlog, removeBlog, setBlogs, setUser, setErrorMessage, setSuccessMessage }) => {
    const id = useParams().id
    const navigate = useNavigate()
    const blog = blogs.find(n => n.id === id)
    if (!blog) {
        return <div>Loading. Please return to homepage before refreshing</div>
        }
    const login = user !== null
    const owner = login && user.username === blog.user.username
    const showWhenLogin = { display: login ? '' : 'none' }
    const showWhenOwner = { display: owner ? '' : 'none' }

    

    const likeUp = event => {
        event.preventDefault()
        updateBlog(blog.id, {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url
        })
    }

    const remove = async (event) => {
        event.preventDefault()
        await removeBlog(blog)
        navigate("/")
    }

    return (
        <div className="blogitem">
        <h2><b>{blog.title}</b> by {blog.author} <br/></h2>
        <div>
            <h3>URL:</h3>{blog.url}
            <h3>Likes:</h3>{blog.likes}
            <h3>Poster:</h3>
            {blog.user.username}
            <br/>
            <h3>Operations:</h3>
            <div style={showWhenOwner}>
            <button onClick={remove}>Remove blog</button>
            </div>
            <div style={showWhenLogin}>
            <button onClick={likeUp}>like</button>
            </div>
        </div>
        </div>  
    )
}

export default Detail
