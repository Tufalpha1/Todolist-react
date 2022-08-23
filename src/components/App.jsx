import React, {useEffect, useRef, useState} from 'react';
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todo-key'
const App = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos); 
  }, []);  //going to call it only once because empty array never changes

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))  //saving in local storage
  }, [todos]);  //anytime todo array changes


  function toggleTodo(id){
    const newTodos = [...todos];   //copying the todolist
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos , {id: uuidv4(), name: name, complete: false}]
      })
    
    todoNameRef.current.value = null;
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <div className="App">
      <Todolist todos = {todos} toggleTodo = {toggleTodo} />
      <input ref= {todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do.</div>
    </div>
  );
}

export default App;
