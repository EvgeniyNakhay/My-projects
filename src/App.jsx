import { useEffect, useState } from "react";
import MainHeader from "./components/MainHeader";
import InputTask from "./components/InputTask";
import TodoList from "./components/TodoList";
import TodosCounter from "./components/TodosCounter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const initialTodos = localStorage.getItem("todos");
    return initialTodos ? JSON.parse(initialTodos) : [];
  }, []);

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

  async function getAllTasks() {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos?isCompleted=false",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoZW55YV9uYWtoYXlAZ21haWwuY29tIiwiaWQiOjE4OTQsImlhdCI6MTc1ODc4OTE2Mn0.Jzp0zxUwybf6Uyp0_3kUkYZnlZoh3_xR7DXD0WnwAMM",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTasks();
  }, []);

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
