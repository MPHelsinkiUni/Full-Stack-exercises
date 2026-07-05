import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Blog from './Blog'

const BlogList = ({ blogs, user, updateBlog, removeBlog, setBlogs, setUser, setErrorMessage, setSuccessMessage }) => {
    const blogsList = () => (
      <div>
        <h2>Recent blogs</h2>
        <TableContainer component={Paper}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Likes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                        <Blog user={user} key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
