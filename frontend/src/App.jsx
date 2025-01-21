import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { RenderTodos } from "./components/RenderTodos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data.todo || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div >
      <CreateTodo></CreateTodo>
      <RenderTodos
        todos={todos}
      ></RenderTodos>
      </div>
    </div>
  );
}

export default App;
