import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
// import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    initLike: (state, action) => {
      const blog = action.payload
      const update = { ...blog, likes: blog.likes + 1 }
      return state.map(b => (b.id !== blog.id ? b : update))
    },
    delBlog: (state, action) => {
      const blog = action.payload
      return state.filter(b => (b.id !== blog.id ? b : ''))
    },
    appendBlog: (state,action) => { 
      return state.concat(action.payload)
    },
    commentBlog: (state, action) => {
      return state.map(b => b.id !== action.payload.id ? b : action.payload)
    }
  },
})
export const { setBlogs, initLike, delBlog, appendBlog, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const blogLike = blog => {
  return async (dispatch, getState) => {
    await dispatch(initLike(blog))
    const updated = await getState().blogs.find(b => b.id === blog.id)
    await blogService.update(blog.id, updated)
  }
}

export const blogDelete = blog => {
  return async dispatch => {
    await dispatch(delBlog(blog))
    await blogService.del(blog.id)
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    await dispatch(appendBlog(newBlog))
  }
}
export const addComment = (id, comment) => {
  return async dispatch => {
    const newBlog = await blogService.addComment(id, comment)
    await dispatch(commentBlog(newBlog))
  }
}

export default blogSlice.reducer
