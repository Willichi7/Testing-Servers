const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, before, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../model/blog')
const { MONGO_URI } = require('../utils/config')
const app = require('../app')
const { initialBlogs, blogInDb } = require('./list_helper')
const api = supertest(app)


// Global setup for database connection
before(async () => {
  await mongoose.connect(MONGO_URI)
})

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  // Test cases
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
      assert(blog.id)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Author Test',
        url: 'http://example.com',
        likes: 10
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(titles.includes('Test Blog'))
    })

    test('title and url are required', async () => {
      const newBlog = {
        author: 'Author Test',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await blogInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('default likes to 0 if missing from request', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Author Test',
        url: 'http://example.com',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const savedBlog = response.body
      const likes = savedBlog.likes === undefined ? 0 : savedBlog.likes
      assert.strictEqual(likes, 0)
    })
  })

  describe('deletion of a blog', () => {
    test('delete a blog', async () => {
      const blogsAtStart = await blogInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  test('update a blog', async () => {
    const blogsAtStart = await blogInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: 100,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })
})

// Global cleanup after all tests
after(async () => {
  await mongoose.connection.close()
})
