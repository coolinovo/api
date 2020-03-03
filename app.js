const Koa = require('koa')
const router = require('koa-router')()
const bdparser = require('koa-body-parser')
const render = require('koa-art-template')
const path = require('path')
const app = new Koa()

app.use(bdparser())
// app.use(views('views', {}))
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async ctx => {
  // ctx.body = 'hello'
  await ctx.render('index')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)