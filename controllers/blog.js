const Blog = require('../model/blog')
const User = require('../model/user')
const { userExtractor } = require('../utils/middleware')
require('dotenv').config()
const blogController = require('express').Router()


blogController.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogController.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = await User.findById(req.user.userId)
  if (!user.blogs) {
    user.blogs = []
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes : likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

//
blogController.get('/:id', async (req, res, ) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogController.put('/:id', async (req, res) => {
  const blog = req.body
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true })
  res.json(blog)
})

blogController.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  if (blog.user.toString() === req.user.user.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    res.status(403).json({ error: 'Permission Denied' })
  }
})


module.exports = blogController