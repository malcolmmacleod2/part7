import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

import { createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, update, remove, createComment } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

import {
  Switch, Route, useRouteMatch, Link
} from "react-router-dom"

import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([]) 
  const [error, setError] = useState('')

  const padding = {
    padding: 5
  }

  const bar = {
    backgroundColor: 'grey'
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs) 
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {

      const fetchUsers = async () => {
          const allUsers = await userService.getAll()
          console.log(allUsers)
          setUsers(allUsers)
      }
      
      fetchUsers()
  }, [])   

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedInBlogsAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(login(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogsAppUser')
    dispatch(logout())
  }

  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))

      dispatch(createNotification(`A new blog '${newBlog.title}' by ${newBlog.author} has been added`, 5))

      blogFormRef.current.toggleVisibility()

    } catch (exception) {
      console.log(exception)
    }
  }

  const addComment = async (blog, newComment) => {
    try {
      dispatch(createComment(blog, newComment))

    } catch (exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      dispatch(update(newBlog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    try {
      dispatch(remove(blog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          setUsername={({ target }) => setUsername(target.value)}
          setPassword={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
       
       <Switch>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/blogs/:id">
          <Blog
          blog={matchedBlog}
          updateBlog={updateBlog}
          deleteBlog={removeBlog}
          createComment={addComment}
          />
        </Route>
        <Route path="/blogs">
          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs}/>
        </Route>
      </Switch>
        
      </div>
    )
  }

  const header = () => {
    return (
      <div style={bar}>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span >
          <span>{user.name} logged in</span>
          <Button id='Logout' type="button" onClick={handleLogout}>
            Logout
          </Button>
        </span>

      </div>
    )
  }

  const match = useRouteMatch('/users/:id')
  const matchedUser = match 
    ? users.find(u => u.id === match.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchedBlog = matchBlog 
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  console.log({blogs})
  console.log({matchBlog})
  console.log({matchedBlog})

  return (
    <Container>
      <div>
        <Notification />
        <Error message={error} />
        
        <h2>Blog app</h2>

        {user === null && loginForm()}
        {user !== null && header() }
        {user !== null && blogForm() }
      </div>
    </Container>
    
  )
}

export default App
