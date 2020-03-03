const router = require('koa-router')()

// home page
router.get ('/', async ctx => {
  await ctx.render('index')
})

module.exports = router.routes()