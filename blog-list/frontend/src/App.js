import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Link } from 'react-router-dom'

import blogsService from './services/blogs'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { logoutUser, setUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const user = useSelector(s => s.user)
  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogsService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = async event => {
    try {
      event.preventDefault()
      dispatch(logoutUser())
      dispatch(setNotification('success', `Logged out`, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('fail', `Unexpected error occured`, 5))
    }
  }

  return (
    <div className=' bg-blue-200 h-screen shadow-lg'>
      <Notification />
      {user.name === '' ? (
        <div className='flex flex-row w-full bg-green-700 shadow-lg'>
          <Togglable buttonLabel='log in'>
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div className='h-fit bg-green-700'>
          <div className='flex flex-row w-full bg-green-700'>
            <Link
              className='basis-1/4 mx-auto px-10 text-center hover:bg-green-600'
              to={'/blogs'}>
              blogs
            </Link>
            <Link
              className=' basis-1/4 mx-auto px-10 text-center hover:bg-green-600'
              to={'/users'}>
              users
            </Link>
            <div className='basis-1/4  mx-auto text-center hover:bg-green-600'>
              <b>{user.name}</b> logged in
            </div>
            <div className='basis-1/4  mx-auto px-10 text-center hover:bg-green-600'>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
