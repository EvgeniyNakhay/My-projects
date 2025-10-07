import { useState } from "react";

function Task({ todo, todos, setTodos, sortedTodos }) {
  const [editMode, setEditMode] = useState(false);
  const [inputTask, setInputTask] = useState(todo.title);

  async function handleRemoveTodo(id) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoZW55YV9uYWtoYXlAZ21haWwuY29tIiwiaWQiOjE4OTQsImlhdCI6MTc1ODc4OTE2Mn0.Jzp0zxUwybf6Uyp0_3kUkYZnlZoh3_xR7DXD0WnwAMM",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const newArray = todos.filter((item) => item.id !== id);
      setTodos(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckTodo(id) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoZW55YV9uYWtoYXlAZ21haWwuY29tIiwiaWQiOjE4OTQsImlhdCI6MTc1ODc4OTE2Mn0.Jzp0zxUwybf6Uyp0_3kUkYZnlZoh3_xR7DXD0WnwAMM",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const newArray = todos.map((item) => {
        return item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item;
      });
      setTodos(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditMode() {
    setEditMode(true);
  }

  async function saveEditTask(id, newTitle) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoZW55YV9uYWtoYXlAZ21haWwuY29tIiwiaWQiOjE4OTQsImlhdCI6MTc1ODc4OTE2Mn0.Jzp0zxUwybf6Uyp0_3kUkYZnlZoh3_xR7DXD0WnwAMM",
          },
          body: JSON.stringify({
            title: newTitle,
          }),
        }
      );
      const data = await response.json();
      const newArray = todos.map((item) => {
        return item.id === id ? { ...item, title: newTitle } : item;
      });
      setTodos(newArray);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (editMode) {
    return (
      <div>
        <input
          value={inputTask}
          onChange={(event) => setInputTask(event.target.value)}
        />
        <button onClick={() => saveEditTask(todo.id, inputTask)}>Save</button>
      </div>
    );
  } else {
    return (
      <div
        key={todo.id}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleCheckTodo(todo.id)}
        />
        <p
          className="todo-task"
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
        >
          {todo.title}
        </p>
        <div>
          <button style={{ marginInline: "5px" }} onClick={handleEditMode}>
            📝
          </button>
          <button onClick={() => handleRemoveTodo(todo.id)}>🗑️</button>
        </div>
      </div>
    );
  }
}

export default Task;
