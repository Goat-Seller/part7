import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) =>
    blogs.slice().sort((a, b) => b.likes - a.likes)
  )
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <b className='relative flex text-2xl text-green-700'>Blogs on website</b>
      <ul>
        {blogs.map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className='relative flex items-center justify-center shadow-lg rounded-lg px-4 min-h-[2.5rem] w-screen my-4 bg-green-400 hover:h-12 hover:bg-green-500 transition-all duration-300'>
              <p>
                {blog.title} by {blog.author}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
