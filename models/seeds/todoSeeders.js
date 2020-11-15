const mongoose = require('mongoose')
const Todo = require('../todo')

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

  for (let i = 1; i <= 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('seeds created!')
})
