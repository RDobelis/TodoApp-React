import { useState } from "react";
import { Todo } from "./TodoApp";
import { FiCheck } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "../styles/components/TodoItem.scss";

type TodoListProps = {
  todo: Todo;
  onCheckboxChange: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
};

export const TodoItemIsDone = ({
  todo,
  onCheckboxChange,
  onDelete,
  onEdit,
}: TodoListProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleEdit = () => {
    onEdit(todo.id, newTitle, newDescription);
    setEditMode(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setEditMode(false);
  };

  return (
    <div className="todo-item">
      <input
        className="checkboxdone"
        type="checkbox"
        checked={todo.isDone}
        onChange={() => onCheckboxChange(todo.id)}
      />
      <div className="todo-item-info">
        {editMode ? (
          <div>
            <input
              className="edit-input"
              type="text"
              value={newTitle}
              style={{ width: "50%" }}
              placeholder="Title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              value={newDescription || ""}
              style={{ width: "50%" }}
              placeholder="Description"
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
          </div>
        ) : (
          <div>
            <p className={todo.isDone ? "done" : ""}>{newTitle}</p>
            <p>{newDescription}</p>
          </div>
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
