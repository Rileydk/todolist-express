//// 載入套件和模組
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const Todo = require('./models/todo')

//// 設定變數
const app = express()
const port = 3000

//// 與資料庫連線
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} MongoDB error!`)
})

db.once('open', () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} MongoDB connected!`)
})

//// 設定樣板引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

//// 指定經過處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//// 設定路由
app.use(routes)

//// 啟動應用程式伺服器
app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}.`)
})
