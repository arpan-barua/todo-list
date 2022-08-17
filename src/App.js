import './App.css';
import { useEffect, useState } from "react";

const getSavedData = ()=>{
  const items = localStorage.getItem('items')
  if (items) {
    return JSON.parse(localStorage.getItem('items'));
   }else
   return [];
}

const App = () => {
  const [inputs, setInputs] = useState({ text: "", completed: false });
  const [todos, setTodos] = useState(getSavedData());
console.log(todos)
  const handleChange = (e) => {
    setInputs({ ...inputs, text: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTodos([...todos, inputs]);
    setInputs({ ...inputs, text: "" });
  };

  const handleTodo = (i) => {
    setTodos(
      todos.map((todo, k) =>
        i === k ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (event, i) => {
    event.stopPropagation();
    setTodos(todos.filter((todo, k) => k !== i));
  };

useEffect(() => {
  localStorage.setItem('items', JSON.stringify(todos));
}, [todos]);

//const savedData = localStorage.getItem(JSON.parse('items'))

/*useEffect(() => {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items) {
   setTodos(items);
  }
}, []);*/




  return (
    <>
      <h1>TODO LIST</h1>
      <input type="text" value={inputs.text} onChange={handleChange} />
      <button onClick={handleAdd}>ADD</button>
      <ul>
        {todos &&
          todos.map((todo, i) => (
            <li
              key={todo.text}
              onClick={() => handleTodo(i)}
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.text}{" "}
              <button onClick={(event) => handleDelete(event,i)}>X</button>
            </li>
          ))}
      </ul>
    </>
  );
};
export default App;
