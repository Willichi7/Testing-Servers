const userRouter = require('express').Router();
const bycrypt = require('bcrypt');
const User = require('../model/user');




userRouter.post('/', async (req, res) => {
   const {username, name, password } = req.body;

   const saltRounds = 10;  
   const hashedPassword = await bycrypt.hash(password, saltRounds);  

   const user = new User({
      username,
      name,
      password: hashedPassword,
      
   })

   const savedUser = await user.save();
   if(savedUser){
      res.status(201).json(savedUser)
   }

})

userRouter.get('/', async (req, res) => { 
   const users = await User.find({}).populate('blogs', {url : 1, title: 1, author: 1})
   res.json(users)
})




module.exports = userRouter