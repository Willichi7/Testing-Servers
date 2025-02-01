const morgan = require('morgan')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const { requestLogger, unknownEndPoint, errorHandler, tokenExtractor } = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogController = require('./controllers/blog')



// middleware
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

// morgan config
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :body '))

app.use(tokenExtractor)
// app routes
app.use('/api/blogs', blogController)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


app.use(requestLogger)

// handler of request with unknown endpoint
app.use(unknownEndPoint)

// error handling for middleware
app.use(errorHandler)




module.exports = app