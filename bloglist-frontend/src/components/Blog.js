import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const loggedInUser = useSelector(state => state.user)


  if (!blog) {
    return null
  }


  const updateLikes = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }

    await updateBlog(updatedBlog)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }

  return (
    <div className="Blog" style={blogStyle}>
      <div className="BlogDetails">
        <div>
          {blog.title} {blog.author}
        </div>
        <div>{blog.url}</div>
        <div className="BlogLikes">
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog?.user?.name}</div>
        {loggedInUser?.username === blog?.user?.username && (
          <button className='Remove' onClick={removeBlog}>Remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
