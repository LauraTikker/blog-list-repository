/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.PORT || 8000
let MONGODB_URI = process.env.MONGODB_URI

const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
  MONGODB_URI,
  PORT,
  inProduction
}