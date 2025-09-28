function TodosCounter({ todos }) {
  const numberOfCompletedTasks = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Осталось дел:</p>
      {numberOfCompletedTasks}
    </div>
  );
}

export default TodosCounter;
