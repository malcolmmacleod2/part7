export const login = (user) => {
  return dispatch => {

    dispatch({
        type: 'LOGIN',
        data: user
      })
  }
}

export const logout = () => {
  return dispatch => {

    dispatch({
        type: 'LOGOUT'
      })
  }
}

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {

    case 'LOGIN':
      return state = action.data

    case 'LOGOUT':
      return state = null

    default:
      return state
  }
}

export default userReducer