import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)

  const users = response.data
  const sortedUsers = users.sort((a, b) => a.name - b.name)
  return sortedUsers
}

export default { getAll, setToken }