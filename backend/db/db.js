const mongoose = require("mongoose");
const { string, boolean } = require("zod");

mongoose.connect(
  process.env.MONGODB_URI
).then(console.log('mongoDb connected'));

const todoSchema =new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todos = mongoose.model("todos", todoSchema);
module.exports = todos;
