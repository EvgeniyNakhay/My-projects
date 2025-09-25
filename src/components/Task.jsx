import { useState } from "react";

function Task({ todo, setTodos, sortedTodos }) {
  const [editMode, setEditMode] = useState(false);
  const [inputTask, setInputTask] = useState(todo.title);

  async function removeTodo(id) {
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
    } catch (error) {
      console.log(error);
    }
  }

  function handleCheckTodo(id) {
    setTodos((todos) =>
      todos.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }

  function handleEditMode(id) {
    setEditMode(true);
  }

  // function handleRemoveTodo(id) {
  //   setTodos((todos) => todos.filter((item) => item.id !== id));
  // }

  function saveEditTask(id, newTitle) {
    setTodos((todos) =>
      todos.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
    setEditMode(false);
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
          checked={todo.isChecked}
          onChange={() => handleCheckTodo(todo.id)}
        />
        <p
          className="todo-task"
          style={{
            textDecoration: todo.isChecked ? "line-through" : "none",
          }}
        >
          {todo.title}
        </p>
        <div>
          <button
            style={{ marginInline: "5px" }}
            onClick={() => handleEditMode(todo.id)}
          >
            📝
          </button>
          <button onClick={() => removeTodo(todo.id)}>🗑️</button>
        </div>
      </div>
    );
  }
}

export default Task;
