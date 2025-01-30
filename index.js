const app = require('./app')
const { MONGO_URI, PORT } = require('./utils/config')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')


// database connection
mongoose.set('strictQuery', false)
info('connecting to:', MONGO_URI)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(err => {
    error('Error connecting to MongoDB:', err)
  })


// connecting to server port
app.listen(PORT, () => {
  info(`Server running on port http://localhost:${PORT}`)
})
