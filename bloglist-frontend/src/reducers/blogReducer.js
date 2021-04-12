import blogService from '../services/blogs'

export const createBlog = (data) => {
  return async dispatch =>  {
      const newBlog = await blogService.create(data)
      dispatch({
        type: 'CREATE',
        data: newBlog
      })
    }
  }

export const createComment = (blog, comment) => {
  return async dispatch =>  {
      const updatedBlog = await blogService.postComment(blog, comment)

      dispatch({
        type: 'CREATECOMMENT',
        data: updatedBlog
      })
    }
  }

export const initializeBlogs = () => {
    
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
          type: 'CREATE',
          data
        })
    }
}

export const update = (blog) => {
  return async dispatch => {

    const updated = await blogService.put(blog)

    dispatch({
        type: 'UPDATE',
        data: updated
      })
  }
}

export const remove = (blog) => {
  return async dispatch => {

    await blogService.remove(blog)

    dispatch({
        type: 'REMOVE',
        data: blog.id
      })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

    case 'CREATE':
      return state.concat(action.data)

    case 'CREATECOMMENT':
      const updatedWithComment = action.data
    
      state = state.map(blog =>
        blog.id !== updatedWithComment.id ? blog : updatedWithComment 
      )
      return state

    case 'INIT':
      return action.data

    case 'UPDATE':
      const updated = action.data
    
      state = state.map(blog =>
        blog.id !== updated.id ? blog : updated 
      )
      return state

    case 'REMOVE':
      const deletedId = action.data

      state = state.filter(blog =>
        blog.id !== deletedId 
      )
      return state

    default:
      return state
  }
}

export default blogReducer