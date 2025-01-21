const z = require('zod')

module.exports.createTodo = z.object({
    title:z.string(),
    description:z.string()
})

module.exports.updateTodo = z.object({
    id:z.string()
})

module.exports.DeleteTodo = z.object({
    id:z.string()
})