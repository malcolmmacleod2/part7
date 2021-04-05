import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

import { createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, update, remove } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      setUser(user)
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
        <p>{user.name} logged in</p>
        <button id='Logout' type="button" onClick={handleLogout}>
          Logout
        </button>

        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <Error message={error} />
      <h2>Blogs</h2>

      {user === null && loginForm()}
      {user !== null && blogForm()}

      {blogs !== undefined && blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={removeBlog}
          loggedInUser={user}
        />
      ))}
    </div>
  )
}

export default App
