import { useState } from "react";

function InputTask({ todos, setTodos, setWarning }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function onAddTodo() {
    if (inputValue.trim()) {
      addNewTask();
      setInputValue("");
      setWarning(false);
    } else {
      setWarning(true);
      setInputValue("");
    }
  }

  async function addNewTask() {
    try {
      const request = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoZW55YV9uYWtoYXlAZ21haWwuY29tIiwiaWQiOjE4OTQsImlhdCI6MTc1ODc4OTE2Mn0.Jzp0zxUwybf6Uyp0_3kUkYZnlZoh3_xR7DXD0WnwAMM",
          },
          body: JSON.stringify({
            title: inputValue,
          }),
        }
      );
      const data = await request.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <input
        onChange={handleChange}
        value={inputValue}
        type="text"
        placeholder="Введите текст задачи..."
      />
      <button onClick={onAddTodo}>Добавить</button>
    </>
  );
}

export default InputTask;
