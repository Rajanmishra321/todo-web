import axios from "axios";
import { useState } from "react";

export function RenderTodos({ todos }) {
  const [localTodos, setLocalTodos] = useState(todos);
  const [deleteTodo,setDeleteTodo] =useState(todos)

  if (!todos || todos.length === 0) {
    return <div>No todos to display</div>;
  }

  async function markAsCompleted(todoId) {
    try {
      await axios.put(`http://localhost:3000/completed`, {
        id: todoId,
        completed: true,
      });

      const updatedTodos = localTodos.map((todo) =>
        todo._id === todoId ? { ...todo, completed: true } : todo
      );
      setLocalTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(todoId){
    try {
        await axios.delete(`http://localhost:3000/delete`,{
            data: { id: todoId }
        })

        setDeleteTodo(...todos)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div >
      {todos.map(function (todo) {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>

            <div>
              <button onClick={() => markAsCompleted(todo._id)}>
                {todo.completed ? "Completed" : "Mark as Completed"}
              </button>
              <button onClick={() => handleDeleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
