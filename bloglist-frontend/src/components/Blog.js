import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { Button } from '@material-ui/core'

const Blog = ({ blog, updateBlog, deleteBlog, createComment }) => {

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
          <Button onClick={updateLikes}>like</Button>
        </div>
        <div>{blog?.user?.name}</div>
        <h3>Comments</h3>
        <CommentForm createComment={createComment} blog={blog} />
        {blog?.comments.map((c, i) => <li key={i}>{c}</li>)}
        {loggedInUser?.username === blog?.user?.username && (
          <Button className='Remove' onClick={removeBlog}>Remove</Button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired
}

export default Blog
