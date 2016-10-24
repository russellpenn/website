'use strict'

// builtin
const Debug = require('debug')
const fs = require('fs')
const path = require('path')

// middleware
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')
const logger = require('koa-logger')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')

// instantiations
const debug = new Debug('app:app.js')
const app = new Koa()
const router = new Router()

if (app.env === 'development') app.use(logger())
app.use(bodyparser())
app.use(json())
app.use(serve('./dist'))
app.use(views(path.resolve('views'), {
  extension: 'pug'
}))

// initialize routes
fs.readdirSync('routes').forEach(file => {
  debug(`loading route file: routes/${file}`)
  const routes = require(`./routes/${file}`)
  routes.init(router)
})

app.use(router.routes(), router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port)
console.log(`app started on port ${port}`)