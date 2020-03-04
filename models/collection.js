module.exports = {
  users: {
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    email: String,
    create_time: { type: Number, default: Date.now },
    role_id: String
  },
  roles: {
    name: { type: String, required: true }, // 角色名称
    auth_name: String, // 授权人
    auth_time: Number, // 授权时间
    create_time: { type: Number, default: Date.now }, // 创建时间
    menus: Array // 所有有权限操作的菜单path的数组
  },
  products: {
    categoryId: { type: String, required: true }, // 所属分类的id
    pCategoryId: { type: String, required: true }, // 所属分类的父分类id
    name: { type: String, required: true }, // 名称
    price: { type: Number, required: true }, // 价格
    desc: { type: String },
    status: { type: Number, default: 1 }, // 商品状态: 1:在售, 2: 下架了
    imgs: { type: Array, default: [] }, // n个图片文件名的json字符串
    detail: { type: String }
  },
  categories: {
    name: {type: String, required: true},
    parentId: {type: String, required: true, default: '0'}
  }
}