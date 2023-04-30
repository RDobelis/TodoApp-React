import axios from "axios";
import { Todo } from "./TodoApp";

export const addTodoToServer = async (todo: Todo) => {
  try {
    const response = await axios.post("http://localhost:3004/todoLists", todo);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
