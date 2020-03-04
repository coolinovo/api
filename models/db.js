const mongoose = require('mongoose')
const {
  url,
  database,
  options
} = require('./config')
const models = require('./models')

mongoose.set('useCreateIndex', true)

class Db {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Db()
    }
    return this.instance
  }
  constructor() {
    this.client = this.client ? this.client : ''
    this.connect()
  }
  connect() {
    return new Promise((resolve, reject) => {
      let _that = this
      if (_that.client === '') {
        _that.client = mongoose.connect(url + database, options)
        mongoose.connection.on('connected', () => {
          console.info(`${database} is running on ${url + database}`)
          resolve(_that.client)
        })
        mongoose.connection.on('disconnected', err => reject(err))
      } else {
        resolve(_that.client)
      }
    })
  }
  create(collection, data, repeat=false) {
    return new Promise((resolve, reject) => {
      try {
        // 默认不允许插入重复数据
        const flag = repeat
        this.connect().then(() => {
          if (flag) {
            new models[collection](data).save(err => {
              // err ? reject(err) : resolve({status: 1, msg: '插入数据成功'})
              if (err) return reject(err)
              this.retrieve(collection, data).then(res => {
                resolve(res.data)
              })
            })
          } else {
            this.retrieve(collection, data).then(res => {
              if (res.length > 0) {
                resolve({status: 0, msg: '用户已存在'})
              } else {
                new models[collection](data).save(err => {
                  if (err) return reject(err)
                  this.retrieve(collection, data).then(res => {
                    resolve(res)
                  })
                })
              }
            })
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  retrieve(collection, data={}) {
    return new Promise((resolve, reject) => {
      try {
        this.connect().then(() => {
          models[collection].find(data, (err, doc) => {
            err ? reject(err) : resolve({
              status: 1,
              length: doc.length,
              data: doc
            })
          })
        })
      } catch (e) {
        throw new Error(e)
      }
    })
  }
  update(collection, old, now) {
    return new Promise((resolve, reject) => {
      try {
        this.connect().then(() => {
          models[collection].updateMany(old, {$set: now}, err => {
            // err ? reject(err) : resolve({status:1, msg: '更新成功'})
            if (err) return resolve({status: 0, msg: '修改信息失败!'})
            this.retrieve(collection, now).then(res => {
              resolve(res)
            })
          })
        })
      } catch (e) {
        throw new Error(e)
      }
    })
  }
  delete(collection, data) {
    return new Promise((resolve, reject) => {
      try {
        this.connect().then(() => {
          models[collection].deleteMany(data, err => {
            // err ? reject(err) : resolve({status:1, msg: '删除成功'})
            if (err) return resolve({status: 0, msg: '删除用户失败!'})
            resolve({status: 1, msg: '删除用户成功!'})
          })
        })
      } catch (e) {
        throw new Error(e)
      }
    })
  }
}

// const DB = Db.getInstance()
// DB.create('roles', {
//   name: '小弟',
//   auth_name: 'yeh'
// }).then(res => console.log(res))

// DB.create('categories', {
//   name: '啦啦啦'
// }).then(res => console.log(res))

module.exports = Db.getInstance()
