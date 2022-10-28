import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    mess: '',
    className: '',
    timerId: 0,
  },
  reducers: {
    setMess: (state, action) => {
      state.mess = action.payload
    },
    removeMess: state => {
      state.mess = ''
    },

    setTimerId: (state, action) => {
      state.timerId = action.payload
    },
    clearTimerId: state => {
      clearTimeout(state.timerId)
    },

    setClass: (state, action) => {
      state.className = action.payload
    },
    removeClass: state => {
      state.className = ''
    },
  },
})
export const {
  setMess,
  removeMess,
  setTimerId,
  clearTimerId,
  setClass,
  removeClass,
} = notificationSlice.actions

export const setNotification = (view, mess, time) => {
  return (dispatch, getState) => {
    if (getState().notification.mess !== '') {
      dispatch(clearTimerId())
      const timer = setTimeout(() => {
        dispatch(removeMess())
        dispatch(removeClass())
      }, time * 1000)
      dispatch(setTimerId(timer))
    } else {
      const timer = setTimeout(() => {
        dispatch(removeMess())
        dispatch(removeClass())
      }, time * 1000)
      dispatch(setTimerId(timer))
    }
    dispatch(setClass(view))
    dispatch(setMess(mess))
  }
}
export default notificationSlice.reducer
