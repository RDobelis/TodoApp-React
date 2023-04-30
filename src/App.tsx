import "./styles/App.scss";
import { TodoApp } from "./components/TodoApp";
import { TodoListFromServer } from "./components/TodoListFromServer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/todo-list" element={<TodoListFromServer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
