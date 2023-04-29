import { Todo } from "./TodoApp";
import { FaTrash } from "react-icons/fa";
import "../styles/App.scss";

type TodoListProps = {
  todo: Todo;
  onDelete: (id: string) => void;
};

export const TodoItemDelete = ({ todo, onDelete }: TodoListProps) => {
  return (
    <button type="button" onClick={() => onDelete(todo.id)}>
      <FaTrash />
    </button>
  );
};
