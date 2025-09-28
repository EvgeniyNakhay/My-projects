import Task from "./Task";

function TodoList({ setTodos, todos, filterTodos }) {
  const sortedTodos = todos.filter((item) => {
    if (filterTodos === "ACTIVE") {
      return item.isCompleted === false;
    } else if (filterTodos === "COMPLETED") {
      return item.isCompleted === true;
    } else return item;
  });
  return (
    <div>
      {sortedTodos.length === 0 && <h2>Пусто 🫙</h2>}
      {sortedTodos.map((todo) => {
        return (
          <Task key={todo.id} todos={todos} todo={todo} setTodos={setTodos} />
        );
      })}
    </div>
  );
}
export default TodoList;
