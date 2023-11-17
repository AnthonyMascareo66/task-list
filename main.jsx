import React, { useState, useEffect } from 'react';

const TaskListApp = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);

  // Estado para gestionar la entrada del usuario al agregar una nueva tarea
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    completed: false,
  });

  // Función para agregar una nueva tarea
  const addTask = () => {
    // Validación para evitar agregar tareas vacías
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask({
        title: '',
        description: '',
        completed: false,
      });
    }
  };

  // Función para eliminar una tarea por índice
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Función para editar una tarea por índice
  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  // Efecto para cargar las tareas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Efecto para guardar las tareas en localStorage cada vez que se actualizan
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>My React Task List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(index)}>Eliminar</button>
            <button onClick={() => editTask(index, { ...task, completed: !task.completed })}>
              {task.completed ? 'Marcar Pendiente' : 'Marcar Completada'}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <button onClick={addTask}>Agregar Tarea</button>
      </div>
    </div>
  );
};

export default TaskListApp;
