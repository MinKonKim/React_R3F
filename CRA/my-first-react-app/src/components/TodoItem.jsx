import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const TodoItem = ({ id, text, isCompleted }) => {
  const { toggleComplete, deleteTodo } = useContext(TodoContext);

  return (
    <div className="todo-item">
      <input className="checkbox" type="checkbox" checked={isCompleted} />
      <p
        className="todo-text"
        onClick={() => toggleComplete(id)}
        style={{
          textDecoration: isCompleted ? "line-through" : "none",
        }}
      >
        {text}
      </p>
      <button onClick={() => deleteTodo(id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};
