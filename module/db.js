const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/api'
const option = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(dbUrl, option)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'failed to connect'))
db.once('open', () => {
  console.info('connected!')
})



