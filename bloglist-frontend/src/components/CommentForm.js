import React, { useState } from 'react'

const CommentForm = ({ blog, createComment }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()
   
    const newComment = {
      comments: comment
    }

    createComment(blog, newComment)

    setComment('')
  }

  return (
    <div>
        <form onSubmit={handleCreate}>
        <div>
          <input
            id="comment"
            type="comment"
            value={comment}
            name="Comment"
            onChange={handleCommentChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CommentForm