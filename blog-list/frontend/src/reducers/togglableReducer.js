import { createSlice } from '@reduxjs/toolkit'


const togglableSlice = createSlice({
    name: 'toggable',
    initialState: false,
    reducers: {
        setVisable: (state) => {
            return state = true
        },
        removeVisable: (state) => {
            return state = false
        }
    }
})

export const { setVisable, removeVisable } = togglableSlice.actions

export const toggleOn = () => {
    return async dispatch => {
        await dispatch(setVisable())
    }
}
export const toggleOff = () => {
    return async dispatch => {
        await dispatch(removeVisable())
    }
}

export default togglableSlice.reducer