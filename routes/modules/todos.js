const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// create new page
router.get('/new', (req, res) => {
  res.render('new')
})

// get detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

// get edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

// create new
router.post('/new', (req, res) => {
  const name = req.body.name
  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// save edit
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// delete
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
