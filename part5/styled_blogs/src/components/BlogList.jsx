import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, removeBlog, setBlogs, setUser }) => {
    const blogsList = () => (
      <div>
        <h2>Recent blogs</h2>
              {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                        <Blog user={user} key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
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
