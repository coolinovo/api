const mongoose = require('mongoose')
const { Schema, model } = mongoose
const md5 = require('blueimp-md5')
const collection = require('./collection')

// user
const userSchema = new Schema(collection.users)
const UserModel = model('user', userSchema)

// 初始化默认 user
UserModel.findOne({ username: 'yeh' })
  .then(user => {
    if (!user) {
      UserModel.create({
        username: 'yeh',
        password: md5('888')
      })
      .then(doc => {
        console.log(doc)
      })
    }
  })

// role
const roleSchema = new Schema(collection.roles)
const RoleModel = model('roles', roleSchema)

// product
const productSchema = new Schema(collection.products)
const ProductModel = model('product', productSchema)

// category
const categorySchema = new Schema(collection.categories)
const CategoryModel = model('category', categorySchema)

module.exports = {
  users: UserModel,
  roles: RoleModel,
  products: ProductModel,
  categories: CategoryModel
}
