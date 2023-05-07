import { useState } from "react";
import "../styles/components/item.scss";
import { Button } from "./Button";
import { Todo } from "./TodoList";
import { FaTrash, FaEdit, FaSave, FaTimes, FaCheck } from "react-icons/fa";

type TodoItemProps = {
  todo: Todo;
  onCheckboxChange: () => void;
  onDelete: () => void;
  onTodoSave: (newTitle: string) => void;
};

export const TodoItem = ({
  todo,
  onCheckboxChange,
  onTodoSave,
  onDelete,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newInputValue, setNewInputValue] = useState(todo.title);

  return (
    <li className="todo-item">
      <div className="todo-item-content">
        <span className="todo-item-checkbox">
          {todo.isDone && <FaCheck />}
          {!todo.isDone && (
            <input
              type="checkbox"
              id={todo.id}
              checked={todo.isDone}
              onChange={() => {
                onCheckboxChange();
              }}
            />
          )}
        </span>
        {isEdit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onTodoSave(newInputValue);
              setIsEdit(false);
            }}
          >
            <input
              type="text"
              value={newInputValue}
              onChange={(event) => {
                setNewInputValue(event.target.value);
              }}
            />
            <Button type="submit">
              <FaSave />
            </Button>
          </form>
        ) : (
          <h3 className="todo-item-title">{todo.title}</h3>
        )}
        <div className="todo-item-buttons">
          <Button
            variant={isEdit ? "secondary" : "primary"}
            onButtonClick={() => {
              setIsEdit(!isEdit);

              if (isEdit) {
                setNewInputValue(todo.title);
              }
            }}
          >
            {isEdit ? <FaTimes /> : <FaEdit />}
          </Button>
          <Button onButtonClick={onDelete}>
            <FaTrash />
          </Button>
        </div>
      </div>
    </li>
  );
};
