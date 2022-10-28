import axios from 'axios'
const baseUrl = '/api/blogs'
axios.defaults.baseURL = 'http://localhost:3003'

let token = null

const setToken = newToken => (token = `bearer ${newToken}`)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const del = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment: comment})
  return response.data
}

const services = { getAll, create, setToken, update, del, addComment }
export default services
