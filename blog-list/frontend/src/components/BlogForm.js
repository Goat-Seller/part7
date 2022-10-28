import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { toggleOff } from '../reducers/togglableReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const addBlog = async e => {
    e.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    const reset = () => {
      resetTitle()
      resetAuthor()
      resetUrl()
    }
    if (title.value === '' || author.value === '' || url.value === '') {
      dispatch(setNotification('fail', `All data required!`, 5))
    } else {
      try {
        dispatch(createBlog(blogObject))
        dispatch(toggleOff())
        dispatch(
          setNotification(
            'success',
            `A new blog:  ${blogObject.title}, by ${blogObject.author} was added`,
            5
          )
        )
        reset()
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div className='flex flex-col  w-full bg-green-700'>
      <form onSubmit={addBlog}>
        <div className='relative flex items-center justify-center h-16  '>
          <label className='text-center w-20'>title: </label>
          <input
            className='rounded focus:outline-4 focus: outline-offset-4 focus: outline-blue-500 h-6'
            id='title'
            {...title}
            placeholder='title'
          />
        </div>
        <div className='relative flex items-center justify-center h-16 '>
          <label className='text-center  w-20'>author: </label>
          <input
            className='rounded focus:outline-4 focus: outline-offset-4 focus: outline-blue-500 h-6'
            id='author'
            placeholder='author'
            {...author}
          />
        </div>
        <div className='relative flex items-center justify-center h-16'>
          <label className='text-center  w-20'>url: </label>
          <input
            className='rounded focus:outline-4 focus: outline-offset-4 focus: outline-blue-500 h-6'
            id='url'
            placeholder='url'
            {...url}
          />
        </div>
        <div className='relative flex items-center justify-center '>
          <button
            className='rounded hover:bg-green-600 px-2 my-3'
            id='create'
            type='Submit'>
            create
          </button>
        </div>
      </form>
    </div>
  )
}
export default BlogForm
