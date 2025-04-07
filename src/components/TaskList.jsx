// TaskList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/actions/taskActions';
import { WeatherInfo } from './WeatherInfo';
import './TaskList.css';

export const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const tasks = useSelector(state => state.tasks);
  const weatherData = useSelector(state => state.weather);
  const dispatch = useDispatch();
  
  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };
  
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <section className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks <span className="task-count">({tasks.length})</span></h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <p className="no-tasks">No tasks to display</p>
      ) : (
        <ul className="task-list">
          {sortedTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <div className="task-header">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <h3 className="task-title">{task.title}</h3>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </div>
                
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                <div className="task-details">
                  {task.dueDate && (
                    <span className="task-due-date">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  
                  {task.isOutdoor && task.location && (
                    <span className="task-location">
                      📍 {task.location}
                    </span>
                  )}
                </div>
                
                {task.isOutdoor && weatherData[task.id] && (
                  <div className="weather-info-container">
                    <WeatherInfo weatherData={weatherData[task.id]} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};