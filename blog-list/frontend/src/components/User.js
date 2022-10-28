import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
const User = () => {
  const users = useSelector(s => s.users)
  const match = useMatch('/users/:id')
  const user = match && users.find(u => u.id === match.params.id)
  if (user) {
    return (
      <div className='flex flex-col items-center justify-center py-10  bg-green-400'>
        <b className='text-2xl my-4 border-b-2 border-black'>{user.username}</b>
        <ul>
          {user.blogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <p>User not found</p>
  }
}
export default User
