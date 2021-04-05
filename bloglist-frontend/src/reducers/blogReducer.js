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

export const initializeBlogs = () => {
    
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
          type: 'CREATE',
          data
        })
    }

}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

    case 'CREATE':
      return state.concat(action.data)

    case 'INIT':
      return action.data

    default:
      return state
  }
}

export default blogReducer