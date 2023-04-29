import { Todo } from "./TodoApp";
import { TodoListItem } from "./TodoListItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onCheckboxChange: (id: string) => void;
};

export const TodoList = ({
  todos,
  onDelete,
  onEdit,
  onCheckboxChange,
}: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </ul>
  );
};
