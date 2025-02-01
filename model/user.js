const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength : 3 },
  name: { type: String },
  password: { type: String,   minLength : 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],

})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v

    //delete password
    delete returnedObject.password

  }
})


const User = mongoose.model('User', userSchema)

module.exports = User