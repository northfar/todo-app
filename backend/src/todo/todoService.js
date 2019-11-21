const Todo = require('./todo')

Todo.methods(['post','get', 'put', 'delete'])
Todo.updateOptions({new : true, runValidations: true})

module.exports = Todo