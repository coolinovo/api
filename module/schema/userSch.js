const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const { Schema, model } = mongoose

const user = {
  username: { type: String, required: true},
  password: { type: String, required: true},
  phone: String,
  email: String,
  create_time: {type: Number, default: Date.now},
  role_id: String
}

const userSchema = new Schema(user)
const UserModel = model('user', userSchema)

// 初始化默认 user
const root = { username: 'root', password: 'root'}
UserModel.findOne({username: 'root'})