import { Todo } from "./TodoApp";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import "../styles/App.scss";

type TodoListProps = {
  todo: Todo;
  onEdit: (id: string, newTitle: string) => void;
};

export const TodoItemEdit = ({ todo, onEdit }: TodoListProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [originalTitle, setOriginalTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(todo.id, newTitle);
    setEditMode(false);
  };

  const handleCancel = () => {
    setNewTitle(originalTitle);
    setEditMode(false);
  };

  return editMode ? (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button className="edit-button" onClick={handleEdit}>
        Save
      </button>
      <button className="edit-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="edit-button"
      onClick={() => {
        setOriginalTitle(newTitle);
        setEditMode(true);
      }}
    >
      <FiEdit />
    </button>
  );
};
