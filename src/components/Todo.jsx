import React from 'react'

const Todo = ({todo, toggleTodo}) => {
    function handleToggleClick(){
        toggleTodo(todo.id)
    }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleToggleClick}/>
        {todo.name}
      </label>
    </div>
  )
}

export default Todo
