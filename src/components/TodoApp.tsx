import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { Link } from "react-router-dom";
import { addTodoToServer } from "./todoAPI";

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

  const handleEdit = (
    id: string,
    newTitle: string,
    newDescription?: string
  ) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
          description:
            newDescription !== undefined ? newDescription : todo.description,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleCheckboxChange = async (id: string) => {
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

    const todoToCheck = newTodos.find((todo) => todo.id === id);
    if (todoToCheck && todoToCheck.isDone) {
      const serverResponse = await addTodoToServer(todoToCheck);
      if (serverResponse) {
        console.log("Successfully added todo to server:", serverResponse);
      } else {
        console.log("Failed to add todo to server.");
      }
    }
  };

  const handleAddTodo = (todo: Todo) => {
    if (todo.title.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      title: todo.title,
      id: Math.random().toString(),
      isDone: false,
      description: todo.description,
    };
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
          <Link to="/todo-list">View Todo List</Link>
    </div>
  );
};
