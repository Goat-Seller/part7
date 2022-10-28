import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { toggleOff } from '../reducers/togglableReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: rUsername, ...username } = useField('text')
  const { reset: rPassword, ...password } = useField('password')
  const handleLogin = event => {
    event.preventDefault()

    const reset = () => {
      rUsername()
      rPassword()
    }
    const createToken = async (username, password) => {
      try {
        await dispatch(loginUser(username, password))
        reset()
        dispatch(toggleOff())
        dispatch(setNotification('success', `User ${username} logged in`, 5))
      } catch (exception) {
        console.log(exception)
        dispatch(setNotification('fail', `wrong username or password!`, 2))
      }
    }

    createToken(username.value, password.value)
  }

  return (
    <div>
      <h2 className='leading-10'>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div className='rounded border-blue-400 border-4 pt-4'>
          <div>
            <label>username: </label>
            <input
              className='rounded focus:outline-2 focus: outline-offset-1 focus: outline-blue-500 h-6'
              id='username'
              name='Username'
              {...username}
            />
          </div>
          <br />
          <div>
            <label>password: </label>
            <input
              className='rounded focus:outline-2 focus: outline-offset-1 focus: outline-blue-500 h-6'
              id='password'
              name='Password'
              {...password}
            />
          </div>
        
        <button
          className='rounded hover:bg-green-600 px-2 my-3'
          id='loginSubmit'
          type='submit'>
          login
        </button>
        </div>
      </form>
    </div>
  )
}
export default LoginForm
