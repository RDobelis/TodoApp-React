import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Todo } from "./TodoApp";
import "../styles/components/TodoListFromServer.scss";
import { FaArrowLeft, FaDownload, FaTrash, FaEdit } from "react-icons/fa";

type TodoListFromServerProps = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
  todos: Todo[];
};

const API_URL = "http://localhost:3004/todoLists";

export const TodoListFromServer = () => {
  const history = useNavigate();
  const [todoLists, setTodoLists] = useState<TodoListFromServerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");

  const fetchTodoLists = async () => {
    setLoading(true);
    try {
      const response = await axios.get<TodoListFromServerProps[]>(API_URL);
      setTodoLists(response.data);
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodoLists(todoLists.filter((list) => list.id !== id));
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleFetchClick = () => {
    fetchTodoLists();
  };

  return (
    <div className="server-todo-container">
      <h1 className="server-todo-title">Todo List From Server</h1>
      <button className="server-backButton" onClick={() => history(-1)}>
        <FaArrowLeft /> Back
      </button>
      <button className="server-fetchButton" onClick={handleFetchClick}>
        <FaDownload /> Todos
      </button>
      {loading && <div>Loading...</div>}
      {!loading && todoLists.length > 0 && (
        <div>
          {todoLists.map((list) => (
            <div key={list.id} className="server-todo-list-item">
              <div className="server-todo-list-item-info">
                <h3 className="listTitle">{list.title}</h3>
                <p>{list.description}</p>
              </div>
              <div className="server-todo-item-buttons">
                <button
                  className="server-deleteButton"
                  onClick={() => handleDeleteTodo(list.id)}
                >
                  <FaTrash />
                </button>
              </div>
              <ul>
                {list.todos &&
                  list.todos.map((todo) => (
                    <li key={todo.id}>
                      <div className="server-todo-list-item">
                        <p className={todo.isDone ? "done" : ""}>
                          {todo.title}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {!loading && todoLists.length === 0 && <div>Empty...</div>}
    </div>
  );
};
