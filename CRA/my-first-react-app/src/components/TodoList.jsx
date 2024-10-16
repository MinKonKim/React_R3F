import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };
  const toggleComplete = (id) => {
    console.log(id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          {...todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
