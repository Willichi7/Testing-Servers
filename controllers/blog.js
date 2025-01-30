const Blog = require("../model/blog");
const User = require("../model/user");;
require('dotenv').config()
const blogController = require('express').Router()


blogController.get('/', async (req, res) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
   res.json(blogs)
})

blogController.post('/', async (req, res) => {
  const body = req.body
   const user = await User.findById(body.id)
   if (!user.blogs) {
      user.blogs = []
   }
   
   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes : body.likes === undefined ? false : body.likes,
      user: user.id
   })
   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()
   res.status(201).json(savedBlog)
})

// 
 blogController.get('/:id', async (req, res, next) => {
   const blog = await Blog.findById(req.params.id)
   if(blog) {
      res.json(blog)
   } else {
      res.status(404).end()
   }
 })

 blogController.put('/:id', async (req, res, next) => {
   const blog = req.body
   await Blog.findByIdAndUpdate(req.params.id, blog, {new: true, runValidators: true})
    res.json(blog)
 })

blogController.delete('/:id',async (req, res, next) => {
   await Blog.findByIdAndDelete(req.params.id)
   res.status(204).end()
})


 module.exports = blogController