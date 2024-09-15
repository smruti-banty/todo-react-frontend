import { useEffect } from "react";
import { useState } from "react";

import './App.css'
import AddTodo from "./component/AddTodo";
import Todos from "./component/Todos";
import TodoMenu from "./component/TodoMenu";
import { addToodo, getTodos } from "./service/TodoService";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [allTodo, setTodos] = useState([]);
  const [copyTodos, setCopyTodos] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('ALL');

  useEffect(() => {
    fetchTodos();
  }, [])

  async function fetchTodos() {
    try {
      const response = await getTodos();
      const todos = await response.json();
      setTodos(todos)
      setCopyTodos(todos);
      setSelectedMenu("ALL");
    } catch (error) {
      console.error(error);
    }
  }

  async function submitForm(event) {
    setDisabled(state => true);
    event.preventDefault();
    const form = event.target;
    const inputs = form.elements;

    const obj = {};
    Array.from(inputs).forEach(input => {
      if (input.type !== "submit") {
        obj[input.name] = input.value;
      }
    });

    try {
      const response = await addToodo(obj);
      if (response.status === 201) {
        const data = await response.json();
        fetchTodos();
        form.reset();
      } else {
        console.error(response.statusText)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }

  }

  function filterTodos(state) {
    if (state == 'ALL') {
      setCopyTodos(allTodo);
    } else if (state === "PENDING") {
      setCopyTodos(allTodo.filter(todo => !todo.completed));
    } else {
      setCopyTodos(allTodo.filter(todo => todo.completed));
    }
  }

  return <main>
    <div className="bg-white p-4 rounded-md shadow-lg w-96">
      <h2 className="text-center text-xl">Todo app</h2>
      <AddTodo onSubmit={submitForm} disabled={disabled} />
      <TodoMenu filterTodos={filterTodos}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        fetchTodos={fetchTodos} />
      <hr />
      <Todos todos={copyTodos} fetchTodos={fetchTodos} />
    </div>
  </main>
}

export default App;