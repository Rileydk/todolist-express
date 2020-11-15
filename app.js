const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
const port = 3000

db.on('error', () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} MongoDB error!`)
})

db.once('open', () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} MongoDB connected!`)
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}.`)
})
