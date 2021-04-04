
import notificationReducer from './reducers/notificationReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer, 
  composeWithDevTools(
    applyMiddleware(thunk)
))

export default store