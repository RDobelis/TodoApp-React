import { Todo } from "../App";
import { useState } from "react";
import "../styles/App.scss";

type TodoFormProps = {
  onSubmit: (newTodo: Todo) => void;
};

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      title: inputValue,
      id: Math.random().toString(),
      isDone: false,
    };
    onSubmit(newTodo);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-title">Add todo</label>
      <input
        id="todo-title"
        type="text"
        value={inputValue}
        placeholder="Izglābt pasauli..."
        onChange={(event) => {
          const newValue = event.target.value;
          setInputValue(newValue);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};
