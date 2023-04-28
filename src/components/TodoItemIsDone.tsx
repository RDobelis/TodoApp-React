import { Todo } from "../App";

type TodoListProps = {
  todo: Todo;
  onCheckboxChange: () => void;
};

export const TodoItemIsDone = ({ todo, onCheckboxChange }: TodoListProps) => {
  return (
    <div>
      <p>{todo.title}</p>
      <button onClick={onCheckboxChange}>Done</button>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => onCheckboxChange()}
      />
    </div>
  );
};
