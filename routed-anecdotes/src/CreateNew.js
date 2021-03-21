import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import  {useField} from './hooks'

const CreateNew = ({addNew}) => {

  const history = useHistory()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  let { reset: resetContent, ...restOfContent } = content
  let { reset: resetAuthor, ...restOfAuthor } = author
  let { reset: resetInfo, ...restOfInfo } = info

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    history.push("/");

  }

  const handleReset = (e) => {
      content.reset()
      author.reset()
      info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...restOfContent} />
        </div>
        <div>
          author
          <input {...restOfAuthor}  />
        </div>
        <div>
          url for more info
          <input {...restOfInfo}  />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew