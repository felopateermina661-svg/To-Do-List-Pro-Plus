import Button from "@mui/material/Button";
import { useState, useRef, useEffect} from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { TextInput } from "@mantine/core";
import "./App.css";

function App() {

  const inputRef = useRef();
  const [todo, setTodo] = useState(() => {
  const savedTodos = localStorage.getItem("todo");

  if (savedTodos) {
    return JSON.parse(savedTodos);
  }

  return [];
});
  

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleAddTodo = () => {

  const text = inputRef.current.value;
  if (text.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops..",
      text: "Please Enter a task first!",
    });
    return;
  }
  const newItem = {complete: false, text}
  setTodo([...todo, newItem])
  inputRef.current.value = "";
  }
 const handleDone = (index) => {
 const newTodos = [...todo];
 newTodos[index].complete = !newTodos[index].complete;
 setTodo(newTodos);
 }

 const handleDelete = (index) => {
   const newTodos = todo.filter((item, i) => i !== index)
  setTodo(newTodos);
   }
 
 const handleDeleteAll = () => {
   const text = inputRef.current.value;
   if (todo.length === 0) {
     Swal.fire ({
       icon: "error",
       text: "There is no item to delete",
       title: "error",
     })
     return;
   }
   
  Swal.fire({
    title: "Delete all tasks?",
    text: "Are you sure you want to delete all tasks",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete all"
  }).then((result) => {
    if (result.isConfirmed) {
      setTodo([]);
    }
  });
};

  return (
    <>
    <div className="todo">

    <h2>📝 To Do List</h2>

    <ul>
      {todo.map(({text, complete}, index) => {
       return <li className={complete ? "Done" : ""}  key={index}
       >
        <span onClick={() => handleDone(index)}>{text}</span>
        <button className="x" onClick={ () => handleDelete(index)}>❌</button>
        
        </li>
      })}
    </ul>
    <input ref={inputRef} placeholder="Enter item..
  " />
    <Button sx={{ width: "100%" }} variant="contained" color="primary" onClick={handleAddTodo}>
    Add</Button>
    <Button
  fullWidth
  sx={{ mt: 0.5}}
  color="error"
  variant="contained"
  onClick={handleDeleteAll}
>
  Delete All
</Button>
    </div>
    <footer>
      <cite>Made by Felopateer Mina ❤️</cite>
      </footer>
    </>
  )
}

export default App;