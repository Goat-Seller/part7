import { useSelector, useDispatch } from 'react-redux'
import { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { toggleOff, toggleOn } from '../reducers/togglableReducer'

const Togglable = forwardRef((props, refs) => {
  const visable = useSelector(s => s.toggle)
  const dispatch = useDispatch()

  const hide = { display: visable ? 'none' : '' }
  const show = { display: visable ? '' : 'none' }

  const toggleVisibility = async () => {
    if (visable) {
      dispatch(toggleOff())
    } else {
      dispatch(toggleOn())
    }
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })
  return (
    <div className='relative items-center justify-center mx-auto h-fit text-center '>
      <div style={hide}>
        <button
          className='relative items-center justify-center mx-auto w-full text-center  shadow-lg  hover:bg-green-600 px-2 '
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={show}>
        {props.children}
        <button
          className='rounded hover:bg-green-600 px-2 my-3'
          onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
