//// 載入套件和模組
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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
// 首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
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

// 進入編輯頁面按鈕
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

// 送出編輯結果按鈕
app.put('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  console.log(name)
  console.log(isDone)
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.error(error))
})

// 刪除按鈕
app.delete('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//// 啟動應用程式伺服器
app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}.`)
})
