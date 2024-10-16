import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: task,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  return (
    <div className="app-container">
      <input
        onChange={handleOnChange}
        className="todo-input"
        type="text"
        value={task}
      />
      <button onClick={addTodo} className="add-btn">
        Add
      </button>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
