const bcrypt = require('bcrypt')
const User = require('../models/users')

const postUser = async (request, response) => {
  const body = request.body

  if (!body.password) {
    response.status(400).type('json').json({ error: 'Password has to be included' } ).end()
  } else if (body.password.length < 3) {
    response.status(400).type('json').json({ error: 'Password should be at least 3 characters long' }).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      passwordHash: passwordHash,
      name: body.name
    })

    const savedUser = await newUser.save()

    response.json(savedUser)
  }
}

const getUser = async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
}

module.exports = {
  postUser,
  getUser
}