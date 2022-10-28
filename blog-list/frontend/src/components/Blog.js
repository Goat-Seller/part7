import { v4 } from 'uuid'

import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { blogLike, blogDelete, addComment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.user)
  const blogs = useSelector(s => s.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match && blogs.find(b => b.id === match.params.id)
  const like = async e => {
    e.preventDefault()
    dispatch(blogLike(blog))
    dispatch(setNotification('success', `You've liked ${blog.title}`, 5))
  }
  const del = async e => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      if (user.id === blog.user.id) {
        try {
          dispatch(blogDelete(blog))
          dispatch(
            setNotification('success', `You've deleted ${blog.title}`, 5)
          )
        } catch (error) {
          console.log('error', error)
        }
      } else {
        dispatch(setNotification('fail', `You're not a owner of the blog`, 5))
      }
    }
  }
  const comment = async e => {
    e.preventDefault()
    const comment = e.target.comment.value
     dispatch(addComment(blog.id, comment))
    dispatch(setNotification('succes', `You added your comment <3`))
    e.target.comment.value = ''
  }
  if (blog) {
    return (
      <div className='flex flex-col items-center justify-center py-10 bg-green-400'>
        <b className=' w-1/3 text-center bg-green-400'>{blog.title}</b>
        <div className='relative rounded px-3 flex bg-green-600 my-2 w-1/3'>
          <p className='w-1/4 '>Url:</p>
          <em className=''>
            <a href={blog.url}>{blog.url}</a>
          </em>
        </div>
        <div className='relative rounded px-3 flex bg-green-600 my-2 w-1/3'>
          <p className='w-1/4 '>Likes:</p>
          {blog.likes}
          <button
            className='relative px-6 mx-4 flex w-1/3 text-pink-400 hover:text-pink-500 transition-all'
            onClick={like}>
            like me!
          </button>
        </div>
        <div className='relative rounded px-3 flex w-1/3 bg-green-600 my-2 '>
          <p className='w-1/4 '>Added by:</p> <b>{blog.author}</b>
        </div>
        <button
          className='relative rounded px-3 text-center px-auto  bg-green-600 my-2 w-1/3 hover:bg-green-700 transition-all'
          onClick={del}>
          delete
        </button>

        <b className=' w-1/3 text-center '>Comments</b>
        <form onSubmit={comment}>
          <input
            className='rounded focus:outline-2 focus: outline-offset-1 focus: outline-blue-500 h-6'
            type='text'
            name='comment'
          />
          <button
            className='relative rounded px-3 text-center px-auto  bg-green-600 m-2  hover:bg-green-700 transition-all'
            type='submit'>
            Add comment
          </button>
        </form>
        <ol>
          {blog.comments.map(comment => (
            <li className='border-b-2 border-black' key={v4()}>{comment}</li>
          ))}
        </ol>
      </div>
    )
  } else {
    return <p>Blog not found</p>
  }
}
export default Blog
