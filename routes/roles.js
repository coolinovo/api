const router = require('koa-router')()
const DB = require('../models/db')

// roles home page
router.get ('/', async ctx => {
  ctx.body = 'roles'
})

// add
router.post('/add', async ctx => {
  let role = ctx.request.body
  const res = await DB.create('roles', {...role})
  // console.log(res)
  if (res.status === 1) {
    ctx.body = {
      status: 1,
      data: res.data
    }
  } else {
    ctx.body = res
  }
})

// roles list
router.get('/list', async ctx => {
  const list = await DB.retrieve('roles')
  ctx.body = list
})

router.post('/update', async ctx => {
  console.log(1)
  let role = ctx.request.body
  console.log(1, role)
  if (role._id) {
    const res = await DB.update('roles', {_id: role._id}, {...role})
    ctx.body = res
  } else {
    ctx.body = {
      status: 0,
      msg: '用户 id 未知'
    }
  }
})

module.exports = router.routes()