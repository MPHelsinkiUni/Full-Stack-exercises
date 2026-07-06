import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Card, Box, CardActions, CardContent, Button, Typography } from '@mui/material'

const Detail = ({ blogs, user, updateBlog, removeBlog, setBlogs, setUser }) => {
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
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div"><b>{blog.title}</b> by {blog.author} <br/></Typography>
                    <div>
                        <Typography variant="h6" component="div">
                            <ul>
                                <li>URL: {blog.url}</li>
                                <li>Likes: {blog.likes}</li>
                                <li>Poster: {blog.user.username}</li>
                            </ul>
                        <br/>
                        </Typography>
                        {!user && (<div>Login to interact with the blog operations.</div>)}
                        <div style={showWhenOwner}>
                        <Button onClick={remove}>Remove blog</Button>
                        </div>
                        <div style={showWhenLogin}>
                        <Button onClick={likeUp}>Like</Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </Box>
    )
}

export default Detail
