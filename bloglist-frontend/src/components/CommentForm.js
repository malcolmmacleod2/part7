import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

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
          <TextField
            label="comment"
            type="comment"
            value={comment}
            name="Comment"
            onChange={handleCommentChange}
          />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

export default CommentForm