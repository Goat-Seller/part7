import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    name: '',
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.name = action.payload.name
      state.token = action.payload.token
    },
    removeUser: state => {
      state.username = ''
      state.name = ''
      state.token = ''
    },
  },
})
export const { setUser, removeUser } = loginSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
  }
}

export default loginSlice.reducer
