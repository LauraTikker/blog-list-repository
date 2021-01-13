/* eslint-disable no-undef */
const Router = require('express')
const blogs = require('../controllers/blogs.js')
const login = require('../controllers/login.js')
const user = require('../controllers/users.js')

const router = Router()

router.get('/blogs', blogs.getAll)
router.post('/blogs', blogs.postBlog)
router.delete('/blogs/:id', blogs.deleteBlog)
router.put('/blogs/:id', blogs.changeBlog)

router.post('/login', login.postLogin)

router.get('/users', user.getUser)
router.post('/users', user.postUser)

module.exports = router
