import { useState } from "react";
import "./styles/App.scss";
import { TodoItemIsDone } from "./components/TodoItemIsDone";
import { TodoItemDelete } from "./components/TodoItemDelete";
import { TodoItemEdit } from "./components/TodoItemEdit";
import { TodoForm } from "./components/TodoForm";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (id: string, newTitle: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleCheckboxChange = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm onSubmit={handleAddTodo} />
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoItemIsDone
                todo={todo}
                onCheckboxChange={() => {
                  handleCheckboxChange(todo.id);
                }}
              />
              <TodoItemDelete todo={todo} onDelete={handleDelete} />
              <TodoItemEdit todo={todo} onEdit={handleEdit} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
