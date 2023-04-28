import { Todo } from "../App";

type TodoListProps = {
  todo: Todo;
  onDelete: (id: string) => void;
};

export const TodoItemDelete = ({ todo, onDelete }: TodoListProps) => {
  return (
    <button type="button" onClick={() => onDelete(todo.id)}>
      Delete
    </button>
  );
};
