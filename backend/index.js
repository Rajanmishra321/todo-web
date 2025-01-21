const express = require("express");
const dotenv = require('dotenv')
dotenv.config()
const { createTodo, updateTodo, DeleteTodo } = require("./types");
const todos = require("./db/db");
const app = express();
const cors = require("cors");
const { ObjectId } = require('mongodb');
const { config, configDotenv } = require("dotenv");
app.use(cors());
app.use(express.json());

const port = 3000;

app.post("/todo", async (req, res) => {
  const body = await req.body;
  const result = createTodo.safeParse(body);

  if (!result.success) {
    return res.json({
      msg: "invalid inputs",
    });
  }
  todos.create({
    title: body.title,
    description: body.description,
    completed: false,
  });
  res.status(209).json({
    msg: "todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todo = await todos.find();
  if (!todo) {
    return res.status(400).json({
      msg: "todo not found",
    });
  }
  res.status(200).json({
    todo,
  });
});

app.put("/completed", async (req, res) => {
  const body = await req.body;
  const result = updateTodo.safeParse(body);

  if (!result.success) {
    return res.json({
      msg: "invalid inputs",
    });
  }

  await todos.updateOne(
    { _id: req.body.id },
    {
      completed: true,
    }
  );

  return res.json({
    msg: "todo is updated",
  });
});

app.delete("/delete", async (req, res) => {
    try {
      const body = await req.body
      const result = DeleteTodo.safeParse(body);
  
      // Check if validation passed
      if (!result.success) {
        return res.status(400).json({
          msg: "Invalid inputs",
          errors: result.error.errors, // Provide detailed error info for debugging
        });
      }
  
    //   const { id } = req.body;
  
    //   // Convert `id` to ObjectId for MongoDB (if required)
    //   const objectId = new ObjectId(id);
  
      // Perform deletion
      const deletionResult = await todos.deleteOne({ _id: req.body.id });
  
      // Check if the todo was actually deleted
      if (deletionResult.deletedCount === 0) {
        return res.status(404).json({ msg: "Todo not found" });
      }
  
      return res.json({
        msg: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("Error in DELETE /delete:", error);
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  });

  app.listen(port,()=>{
    console.log(`server is listing on port ${port}`)
  })