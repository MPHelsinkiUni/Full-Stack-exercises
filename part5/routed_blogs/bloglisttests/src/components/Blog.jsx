import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [detailVisible, setDetailVisibility] = useState(false)
  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }
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

  const remove = event => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div className="blogitem">
      <b><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></b> by {blog.author} <br/>
      <div style={hideWhenVisible}>
        <button onClick={() => setDetailVisibility(true)}>Show details</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes}
        <div style={showWhenLogin}>
          <button onClick={likeUp}>like</button>
        </div>
        <br/>
        {blog.user.username}
        <br/>
        <button onClick={() => setDetailVisibility(false)}>Hide details</button><br/>
        <div style={showWhenOwner}>
          <button onClick={remove}>Remove blog</button>
        </div>
      </div>
    </div>  
  )
}

export default Blog
