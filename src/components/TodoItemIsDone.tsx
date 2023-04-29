import { useState } from "react";
import { Todo } from "./TodoApp";
import { FiCheck } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "../styles/components/TodoItemIsDone.scss";

type TodoListProps = {
  todo: Todo;
  onCheckboxChange: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export const TodoItemIsDone = ({
  todo,
  onCheckboxChange,
  onDelete,
  onEdit,
}: TodoListProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(todo.id, newTitle);
    setEditMode(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setEditMode(false);
  };

  return (
    <div className="todo-item">
      <div className="todo-item-info">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onCheckboxChange(todo.id)}
        />
        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <p className={todo.isDone ? "done" : ""}>{todo.title}</p>
        )}
      </div>
      <div className="todo-item-buttons">
        {editMode ? (
          <>
            <button
              className="done-button"
              onClick={handleEdit}
              disabled={newTitle.trim() === ""}
            >
              <FiCheck className="icon" />
              <span>Save</span>
            </button>
            <button className="delete-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="done-button"
              onClick={() => onCheckboxChange(todo.id)}
            >
              <FiCheck className="icon" />
              {todo.isDone ? <span>Undo</span> : <span>Done</span>}
            </button>
            <button className="delete-button" onClick={() => onDelete(todo.id)}>
              <FaTrash className="icon" />
            </button>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              <FiEdit className="icon" />
              <span>Edit</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
