const Blog = require('../model/blog')
const User = require('../model/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url : 'https://reactpatterns.com/',
    likes : 7

  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url : 'http://www.u.arizona.edu/~rubinson/copyright_violations/GoToStatementConsideredHarmful.html',
    likes : 5

  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url : 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes : 12

  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const userInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb, userInDb
}

