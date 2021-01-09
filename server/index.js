/* eslint-disable no-undef */
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./utils/routes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to the MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error)
  })
app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use(routes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

