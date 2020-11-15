const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Todo = require('./models/todo')

const port = 3000

const app = express()

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

// 指定經過body-parser解析
app.use(bodyParser.urlencoded({ extended: true }))

// 設定路由
// 首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// 進入新增頁面按鈕
app.get('/todos/new', (req, res) => {
  res.render('new')
})

// 填寫完畢新增todo按鈕
app.post('/todos', (req, res) => {
  const name = req.body.newTodo
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 檢視詳細資料按鈕
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

// 啟動應用程式伺服器
app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}.`)
})
