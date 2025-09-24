import Task from "./Task";

function TodoList({ setTodos, sortedTodos }) {
  return (
    <div>
      {sortedTodos.map((todo) => {
        return (
          <Task
            sortedTodos={sortedTodos}
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
          />
        );
      })}
    </div>
  );
}
export default TodoList;
