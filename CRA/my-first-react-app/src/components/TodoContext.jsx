import { createContext, useState } from "react";

export const TodoContext = createContext(null);
export const TodoProvider = ({ children }) => {
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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleOnChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        task,
        addTodo,
        toggleComplete,
        deleteTodo,
        handleOnChange,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
