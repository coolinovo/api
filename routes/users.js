const router = require('koa-router')()
const DB = require('../models/db')
const md5 = require('blueimp-md5')

// users home page
router.get ('/', async ctx => {
  ctx.body = 'users'
})

// login
router.post('/login', async ctx => {
  let { username, password } = ctx.request.body
  const res = await DB.retrieve('users', {username, password: md5(password)})
  if (res.length !== 0) {
    ctx.body = { status: 1, data: res.data }
  } else {
    ctx.body = {
      status: 0,
      msg: '用户名或者密码不正确!'
    }
  }
})

// register
router.post('/register', async ctx => {
  let user = ctx.request.body
  let md5_user = {...user, password: md5(user.password)}
  console.log(md5_user)
  const res = await DB.create('users', md5_user)
  console.log(res)
  if (res.status === 1) {
    ctx.body = {
      status: 1,
      data: res.data
    }
  } else {
    ctx.body = res
  }
})

router.post('/update', async ctx => {
  let user = ctx.request.body
  const res = await DB.update('users', {_id: user._id}, {...user})
  if (res.status === 1) {
    ctx.body = {
      status: 1,
      data: res.data
    }
  } else {
    ctx.body = res
  }
})

// users list
router.get('/list', async ctx => {
  const list = await DB.retrieve('users')
  ctx.body = list
})

router.post('/delete', async ctx => {
  let user = ctx.request.body
  if (user._id) {
    const res = await DB.delete('users', {...user})
    ctx.body = res
  } else {
    ctx.body = {
      status: 0,
      msg: '用户 id 未知'
    }
  }
})

module.exports = router.routes()