import { useSelector } from 'react-redux'

const Notification = () => {

  const success = ' bg-green-900 w-screen text-center'
  const fail = ' bg-red-900 w-screen text-center'
  const notification = useSelector(state => state.notification)
  if (notification.mess !== '') {
    return (
      <div className={notification.className === 'success' ? success : fail} >
        <em className='text-gray-400'>{notification.mess}</em>
      </div>
    )
  }
}
export default Notification
