import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      const response = await blogService.create(newBlog)
      console.log(response)

      setNotification(
        `A new blog '${response.title}' by ${response.author} has been added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      blogFormRef.current.toggleVisibility()

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.elog(exception)
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      const response = await blogService.put(newBlog)
      console.log(response)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.elog(exception)
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
      <Notification message={notification} />
      <Error message={error} />
      <h2>blogs</h2>

      {user === null && loginForm()}
      {user !== null && blogForm()}

      {blogs.map((blog) => (
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
