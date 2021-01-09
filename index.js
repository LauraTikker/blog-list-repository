/* eslint-disable no-undef */
require('dotenv').config()
const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
require('express-async-errors')

const app = express()

const config = require('./server/utils/config')
const logger = require('./server/utils/logger')

app.use('/api', (req, res, next) => require('./server')(req, res, next))

const inProduction = config.inProduction

const watcher = chokidar.watch('server')
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.includes('server')) delete require.cache[id]
    })
  })
})

if (!inProduction) {
  const webpack = require('webpack')
  const middleware = require('webpack-dev-middleware')
  const hotMiddleWare = require('webpack-hot-middleware')
  const webpackConf = require('./webpack.config')
  const compiler = webpack(webpackConf('development', { mode: 'development' }))

  const devMiddleware = middleware(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleWare(compiler))
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err)
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
      })
    })
  })
} else {
  const DIST_PATH = path.resolve(__dirname, './dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})