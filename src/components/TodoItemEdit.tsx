import { useState } from "react";
import { Todo } from "../App";

type TodoListProps = {
  todo: Todo;
  onEdit: (id: string, newTitle: string) => void;
};

export const TodoItemEdit = ({ todo, onEdit }: TodoListProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(todo.id, newTitle);
    setEditMode(false);
  };

  return editMode ? (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleEdit}>Save</button>
    </div>
  ) : (
    <button onClick={() => setEditMode(true)}>Edit</button>
  );
};
