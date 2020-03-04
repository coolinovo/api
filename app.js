const Koa = require('koa')
const router = require('koa-router')()
const bdparser = require('koa-bodyparser')
const render = require('koa-art-template')
const path = require('path')
const app = new Koa()

const index = require('./routes/index')
const users = require('./routes/users')
const roles = require('./routes/roles')

app.use(bdparser())

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

router.use('/', index)
router.use('/users', users)
router.use('/roles', roles)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)