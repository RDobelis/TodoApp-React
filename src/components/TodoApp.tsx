import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
};

export const TodoApp = () => {
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
    if (todo.title.trim() === "") {
      return;
    }
    setTodos([...todos, todo]);
  };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <TodoForm onSubmit={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
