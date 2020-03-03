const router = require('koa-router')()

// users home page
router.get ('/', async ctx => {
  ctx.body = 'users'
})

// users list
router.get('/list', async ctx => {
  ctx.body = 'users list'
})

module.exports = router.routes()