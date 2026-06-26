import { useState } from 'react'

const Blog = ({ user, blog, likeUpdate, removeBlog }) => {
  const [detailVisible, setDetailVisibility] = useState(false)
  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }
  const owner = user.username === blog.user.username
  const showWhenOwner = { display: owner ? '' : 'none' }


  const likeUp = event => {
    event.preventDefault()
    likeUpdate(blog.id, {
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
      <b>{blog.title}</b> by {blog.author} <br/>
      <div style={hideWhenVisible}>
        <button onClick={() => setDetailVisibility(true)}>Show details</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes}
        <button onClick={likeUp}>like</button>
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
