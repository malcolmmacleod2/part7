import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)

  const blogs = response.data
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}

const create = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

const put = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

const remove = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    await axios.delete(`${baseUrl}/${blog.id}`, config)
  } catch (exception) {
    console.error(exception)
  }
}

const getComments = async (blog) => {
  try {
    const response = await axios.get(`${baseUrl}/${blog.id}/comments`)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

const postComment = async (blog, comment) => {
  try {
    const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
    console.log({response})
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

export default { getAll, create, put, remove, setToken, getComments, postComment }
