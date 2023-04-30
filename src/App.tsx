import "./styles/App.scss";
import { TodoApp } from "./components/TodoApp";
import { TodoListFromServer } from "./components/TodoListFromServer";



function App() {
  return (
    <div className="App">
      <TodoApp />

      <TodoListFromServer />
    </div>
  );
}

export default App;
