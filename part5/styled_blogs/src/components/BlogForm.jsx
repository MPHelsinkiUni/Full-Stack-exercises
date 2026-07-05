import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog, setErrorMessage }) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')
    const navigate = useNavigate()

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

    const addBlog = async (event) => {
        try {
            event.preventDefault()
            await createBlog({
                title: title,
                author: author,
                url: url,
                likes: likes
            })
            setUrl('')
            setTitle('')
            setLikes('')
            setAuthor('')

            navigate('/')
        } catch (error) {
            console.log(error)
            setErrorMessage(
                error.response.data.error
                )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    } 

    return (
        <div>
        <h1>
            Post new blog
        </h1>
        <form onSubmit = {addBlog}>
            <div><TextField label="Title" id="title" value={title} onChange={handleTitleChange}/></div>
            <div><TextField label="Author" type="text" id="author" value={author} onChange={handleAuthorChange}/></div>
            <div><TextField label="Url" type="url" id="url" value={url} onChange={handleUrlChange}/></div>
            <div><TextField label="Likes" type="number" id="likes" value={likes} onChange={handleLikesChange}/></div>
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>send</Button>
        </form>
        </div>
    )
}

export default BlogForm
