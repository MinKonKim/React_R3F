const TodoItem = ({ id, text, isCompleted, toggleComplete, deleteTodo }) => {
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

export default TodoItem;
