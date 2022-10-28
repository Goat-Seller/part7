import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector(s => s.users)
  console.log(users)
  return (
    <div className='w-full pt-10 flex items-center justify-center flex-col'>
      <b className='text-3xl text-green-700 '>Users</b>
      <table className='border-4 m-20 w-full shadow-lg'>
        <thead className='border-4'>
          <tr className=''>
            <th className='w-1/2 border-r-4 text-center text-green-800 '>
              Users
            </th>
            <th className='w-1/2 text-center text-green-900'>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => {
            return (
              <tr key={u.id} className=''>
                <td className='w-1/2 border-r-4 text-center text-green-800 text-xl '>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td className='w-1/2 text-center text-green-900 text-xl'>
                  {u.blogs.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Users
