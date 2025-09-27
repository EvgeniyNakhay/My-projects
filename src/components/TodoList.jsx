import Task from "./Task";

function TodoList({ setTodos, todos }) {
  return (
    <div>
      {todos.length === 0 && <h2>Пусто 🫙</h2>}
      {todos.map((todo) => {
        return (
          <Task key={todo.id} todos={todos} todo={todo} setTodos={setTodos} />
        );
      })}
    </div>
  );
}
export default TodoList;
