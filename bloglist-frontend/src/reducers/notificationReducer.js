const initialState = 'hello'

export const removeNotification = () => {
  return {
      type: 'REMOVE'
    }
  }

export const createNotification = (message, seconds) => {
  return dispatch =>  {
      dispatch({
        type: 'NOTIFY',
        data: message
      })
      setTimeout(() => dispatch(removeNotification()), seconds * 1000)
    }
  }



const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NOTIFY':
        state = action.data
        return state
    case 'REMOVE':
        state = null
        return state
    default:
      return state
  }
}

export default notificationReducer