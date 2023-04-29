import { Todo } from "./TodoApp";
import { useState } from "react";
import "../styles/App.scss";
import "../styles/components/TodoForm.scss";

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
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <button type="submit" className="add-button">
          <span className="icon">+</span>
        </button>
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
      </div>
    </form>
  );
};
