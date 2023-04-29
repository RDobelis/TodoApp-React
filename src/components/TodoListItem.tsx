import { TodoItemIsDone } from "./TodoItemIsDone";
import { Todo } from "./TodoApp";

type TodoListItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onCheckboxChange: (id: string) => void;
};

export const TodoListItem = ({
  todo,
  onDelete,
  onEdit,
  onCheckboxChange,
}: TodoListItemProps) => {
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
          onEdit={onEdit}
        />
      </div>
    </li>
  );
};
