import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import togglableReducer from './reducers/togglableReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
        user: loginReducer,
        toggle: togglableReducer,
        users: usersReducer
    },
})

export default store
