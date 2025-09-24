import { useEffect, useState } from "react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import InputTask from "./components/InputTask";
import TodoList from "./components/TodoList";
import TodosCounter from "./components/TodosCounter";

function App() {
  const [todos, setTodos] = useState(() => {
    const initialTodos = localStorage.getItem("todos");
    return initialTodos ? JSON.parse(initialTodos) : [];
  });

  const [warning, setWarning] = useState(false);

  const [filterTodos, setFilterTodos] = useState("ALL");

  const filteredTodos = todos.filter((todo) => {
    if (filterTodos === "COMPLETED") {
      return todo.isChecked;
    } else if (filterTodos === "ACTIVE") {
      return !todo.isChecked;
    } else return todo;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.isChecked && b.isChecked) {
      return -1;
    }
    if (a.isChecked && !b.isChecked) {
      return 1;
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function clearCompletedTodos() {
    setTodos(todos.filter((todo) => !todo.isChecked));
  }

  return (
    <>
      <MainHeader />
      <InputTask todos={todos} setTodos={setTodos} setWarning={setWarning} />
      {warning ? (
        <p style={{ color: "red" }}>Нельзя добавить пустую задачу</p>
      ) : null}

      <TodoList todos={todos} setTodos={setTodos} sortedTodos={sortedTodos} />
      <div>
        <button onClick={() => setFilterTodos("ALL")}>Все</button>
        <button onClick={() => setFilterTodos("ACTIVE")}>Активные</button>
        <button onClick={() => setFilterTodos("COMPLETED")}>Готовые</button>
      </div>
      <TodosCounter todos={todos} />
      <button onClick={clearCompletedTodos}>Очистить выполненные</button>
    </>
  );
}

export default App;
