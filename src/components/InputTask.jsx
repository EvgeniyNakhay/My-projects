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
