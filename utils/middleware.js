const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '').trim()
  } else {
    req.token = null
  }
  next()
}



const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if(err.name === 'CastError'){
    res.status(400).send({ message: 'Malformated Id' })
  }else if(err.name === 'ValidationError'){
    res.status(400).json({ error: err.message })
  }else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }

  next(err)
}

const unknownEndPoint = (req, res) => {
  res.status(400).send({ error: 'Unknown endpoint' })
}

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

const userExtractor = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}


module.exports = {
  tokenExtractor,
  errorHandler,
  unknownEndPoint,
  requestLogger,
  userExtractor
}