const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const port = 3000

// 與資料庫連線
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

// 設定樣板引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

// 啟動應用程式伺服器
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}.`)
})
