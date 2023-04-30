import { TodoItemIsDone } from "./TodoItemIsDone";
import { Todo } from "./TodoApp";
import "../styles/components/TodoItem.scss";

type TodoListItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
  onCheckboxChange: (id: string) => void;
};

export const TodoListItem = ({
  todo,
  onDelete,
  onEdit,
  onCheckboxChange,
}: TodoListItemProps) => {
  const handleEdit = (newTitle: string, newDescription?: string) => {
    onEdit(todo.id, newTitle, newDescription);
  };

  return (
    <li key={todo.id}>
      <div className="todo-list-item">
        <TodoItemIsDone
          todo={todo}
          onCheckboxChange={() => {
            onCheckboxChange(todo.id);
          }}
          onDelete={() => {
            onDelete(todo.id);
          }}
          onEdit={handleEdit}
        />
      </div>
    </li>
  );
};
