import { useState } from "react";
import "./styles/App.scss";
import { TodoItemIsDone } from "./components/TodoItemIsDone";
import { TodoItemDelete } from "./components/TodoItemDelete";
import { TodoItemEdit } from "./components/TodoItemEdit";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
};

// Mājas darbs:
// Button componenete, kas izdzēš todo item.
// Iznest formu un todo list uz jaunu komponenti!
// Uztaisīt edit opciju, kad parādās input laukus un var updeitot todo item title
// Nostilot visu.

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newTodo: Todo = {
            title: inputValue,
            id: Math.random().toString(),
            isDone: false,
          };
          setTodos([...todos, newTodo]);
          setInputValue("");
        }}
      >
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

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
            <TodoItemIsDone
              todo={todo}
              key={todo.id}
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
