
const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/api'
const option = { useNewUrlParser: true, useUnifiedTopology: true }

class Db {
  // 静态方法，不会被实例继承，只能通过类来调用
  static getInstance() {
    if (!this.instance) {
      this.instance = ''
    } else {
      return this.instance
    }
  }
  constructor() {
    // 实例化时直接调用
    this.connect()
  }
  connect() {
    mongoose.connect(dbUrl, option)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'failed to connect'))
    db.once('open', () => {
      console.info('connected!')
    })
  }
  create() {

  }
  retrieve() {

  }
  update() {

  }
  find() {

  }

}