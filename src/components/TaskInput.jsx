// TaskInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { fetchWeather } from '../redux/actions/weatherActions';
import './TaskInput.css';

export const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [dueDate, setDueDate] = useState('');
  
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title,
      description,
      location,
      isOutdoor,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addTask(newTask));
    
    if (isOutdoor && location) {
      dispatch(fetchWeather(location, newTask.id));
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setLocation('');
    setIsOutdoor(false);
    setDueDate('');
  };
  
  return (
    <section className="task-input-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about this task..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="outdoor-activity-container">
          <input
            type="checkbox"
            id="isOutdoor"
            checked={isOutdoor}
            onChange={(e) => setIsOutdoor(e.target.checked)}
          />
          <label htmlFor="isOutdoor">Outdoor Activity</label>
        </div>
        
        {isOutdoor && (
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City name for weather"
            />
          </div>
        )}
        
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
    </section>
  );
};