const mongoose  = require('mongoose')
const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { userInDb } = require('./list_helper')
const User = require('../model/user')
const app = require('../app')
const { MONGO_URI } = require('../utils/config')
const api = supertest(app)

before(async () => {
  await mongoose.connect(MONGO_URI)
})

describe('testing the user Db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const password = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'Liam', password })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await userInDb()

    const newUser = {
      username: 'mongoose',
      name: 'Mr mongoose',
      password: 'hmmmmmm'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userInDb()
    assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('fails with proper status code and message if username is already taken', async () => {
    const userAtStart = await userInDb()

    const newUser = {
      username: 'Liam',
      name: 'Liam wills',
      password: 'testme'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, userAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
