import React, { useState } from 'react';

// Custom hook para manejar las tareas
const useTaskList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return { tasks, addTask, removeTask };
};

const TaskList = () => {
  const { tasks, addTask, removeTask } = useTaskList();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    removeTask(index);
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => handleRemoveTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTask}>
        <label>
          Nueva tarea:
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>
        <button type="submit">Agregar tarea</button>
      </form>
    </div>
  );
};

export default TaskList;
