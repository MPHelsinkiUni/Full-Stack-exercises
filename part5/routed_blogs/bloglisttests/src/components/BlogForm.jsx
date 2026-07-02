import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

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

    const addBlog = event => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes
        })
        
        setUrl('')
        setTitle('')
        setLikes('')
        setAuthor('')
        } 

    return (
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
}

export default BlogForm
