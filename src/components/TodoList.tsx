import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/components/todo-list.scss";
import { Button } from "./Button";
import { TodoItem } from "./TodoItem";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  decription?: string;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>

      <form
        className="todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!inputValue.trim()) {
            return;
          }
          const newTodo: Todo = {
            title: inputValue,
            id: Math.random().toString(),
            isDone: false,
          };
          setTodos([...todos, newTodo]);
          setInputValue("");
        }}
      >
        <div className="input-group">
          <Button type="submit" variant="secondary" className="add-button">
            <span className="icon">
              <FaPlus />
            </span>
          </Button>

          <input
            type="text"
            value={inputValue}
            placeholder="Nopirkt pārtiku..."
            onChange={(event) => {
              const newValue = event.target.value;
              setInputValue(newValue);
            }}
          />
        </div>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              onTodoSave={(newTitle) => {
                const newTodos = todos.map((todoItem) => {
                  if (todoItem.id === todo.id) {
                    return {
                      ...todoItem,
                      title: newTitle,
                    };
                  }

                  return todoItem;
                });

                setTodos(newTodos);
              }}
              todo={todo}
              key={todo.id}
              onDelete={() => {
                const newTodos = todos.filter((todoItem) => {
                  return todoItem.id !== todo.id;
                });

                setTodos(newTodos);
              }}
              onCheckboxChange={() => {
                const newTodos = todos.map((todoItem) => {
                  if (todoItem.id === todo.id) {
                    return {
                      ...todoItem,
                      isDone: !todoItem.isDone,
                    };
                  }

                  return todoItem;
                });

                setTodos(newTodos);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}
